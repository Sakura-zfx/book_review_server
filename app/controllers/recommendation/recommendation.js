import {
  exec, execSync, spawn
} from 'child_process'
import InterestModel from '../../models/interest'
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
        const recommend_list = spawn(`python`, [fileName , userId, ...user_prefs], {
          cwd: undefined,
          env: process.env
        })
        recommend_list.stdout.on('data',(data) => {
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
    
    const data = await Recommend.findOne({
      where: {
        userId: +userId
      },
      attributes: ['bookList', 'time']
    })
    const timestamps = 5 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000
    if (+new Date() > (+new Date(data.time) + timestamps)) {
      computeRec(userId)
    }
    ctx.body = {
      code: 200,
      msg: '获取推荐成功',
      data: {
        userId: +userId,
        list: JSON.parse(data.bookList)
      }
    }
  }
}

export default RecommendationController