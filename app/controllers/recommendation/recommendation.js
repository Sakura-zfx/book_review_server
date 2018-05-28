import {
  exec,
  execSync,
  spawn
} from 'child_process'
import InterestModel from '../../models/interest'
import BookModel from '../../models/book'
import sequelize from '../../../config/connect'
const Recommend = sequelize.import('../../schema/recommend.js')

class RecommendationController {
  static async getRecBookList(ctx) {
    const computeRec = async (userId) => {
      // 获取图书评分矩阵
      const interestList = await InterestModel.getAllInterest(1000)
      let user_prefs = []
      let user_can = false
      let recommend_list = ''
      // 初始化推荐数据集
      if (interestList) {
        for (let i in interestList) {
          if (+interestList[i].userId === +userId) {
            user_can = true
          }
          const temp = {
            userId: interestList[i].userId,
            bookId: interestList[i].bookId,
            score: interestList[i].score
          }
          user_prefs.push(JSON.stringify(temp))
        }
      }
      if (user_can) {
        let data = []
        const fileName = 'userCF.py'
        const recommend_list = spawn(`python`, [fileName, userId, ...user_prefs], {
          cwd: undefined,
          env: process.env
        })
        recommend_list.stdout.on('data', (data) => {
          const buf = new Buffer(data)
          Recommend.update({
            bookList: buf.toString().trim(),
            time: new Date()
          }, {
            where: {
              userId: userId
            }
          })
        })

        recommend_list.stderr.on('data', data => {
          const buf = new Buffer(data)
          console.log(buf.toString())
        })
      }
    }

    const userId = ctx.params.userId
    const timestamps = 5 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000
    const data = await Recommend.findOne({
      where: {
        userId: +userId
      },
      attributes: ['bookList', 'time']
    })
    if (data) {
      if (+new Date() > (+new Date(data.time) + timestamps)) {
        computeRec(userId)
      }
      const temp = JSON.parse(data.bookList)
      const list = []
      // 每本书的信息
      for (let item of temp) {
        const bookId = +item[0]
        // 获取图书信息
        const each = await BookModel.findBookById(bookId)
        // 作者信息
        const author = each.authorList ? each.authorList.split('/') : []
        let temp = []
        for (let i in author) {
          if (author[i]) {
            try {
              const value_json = JSON.parse(author[i])
          
              if (typeof value_json === 'object') {
                temp.push(value_json)
              } else if (typeof value_json === 'number') {
                temp.push(value_json)
              }
            } catch (e) {
              temp.push(author[i])
            }
          }
        }
        each.setDataValue('authorList', temp)
        // 获取评分
        const score = await InterestModel.getScoreByBook(bookId)
        let total = 0,
          times = 0
        if (score) {
          for (let i in score) {
            if (+score[i].score !== 0) {
              total += (score[i].score * score[i].dataValues.count)
              times += (score[i].dataValues.count)
            } else {
              continue
            }
          }
        }
        const avg = (total === 0 || times === 0) ? 0 : (total / times).toFixed(2)
        each.setDataValue('reviewNumbers', times)
        each.setDataValue('avg', avg)
        each.setDataValue('priority', (+item[1]).toFixed(2))

        list.push(each)
      }
      ctx.body = {
        code: 200,
        msg: '获取推荐成功',
        data: {
          userId: +userId,
          list: list
        }
      }
    } else {
      await Recommend.create({
        userId: +userId,
        bookList: '[]',
      })
      computeRec(userId)      
      ctx.body = {
        code: -2000,
        msg: '推荐初始化'
      }
    }
  }
}

export default RecommendationController