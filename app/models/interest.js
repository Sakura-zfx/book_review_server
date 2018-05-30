import sequelize from '../../config/connect'

const Interest = sequelize.import('../schema/interest.js')

class InterestModel {
  // search
  static async getInterest(userId, bookId) {
    const interest = await Interest.findOne({
      where: {
        bookId: bookId,
        userId: userId
      },
      attributes: ['status', 'score']
    })

    return interest
  }
  // 获取最热图书
  static async getHotList(pageId, limit) {
    const sql = 'select i.bookId, COUNT(i.userId) count from interest as i group by i.bookId having count order by count DESC limit :pageId, :limit'

    const countList = await sequelize.query(sql, {
      replacements: {
        pageId: (pageId - 1),
        limit: limit
      },
      type: sequelize.QueryTypes.SELECT
    })
    return countList
  }
  // 获取书籍下的所有评分
  static async getScoreByBook(bookId) {
    const scoreList = await Interest.findAll({
      where: {
        bookId: bookId
      },
      attributes: ['score', [sequelize.fn('COUNT', sequelize.col('score')), 'count']],
      group: 'score'
    })

    return scoreList
  }
  // 获取用户的评分
  static async getInterestByUser(userId) {
    const interest = await Interest.findAll({
      where: {
        userId: userId
      },
      attributes: ['bookId', 'status', 'score']
    })

    return interest
  }
  // 获取limit条数据
  static async getAllInterest(limit) {
    const Op = sequelize.Op
    const interestList = await Interest.findAll({
      where: {
        score: {
          [Op.gte]: 3
        }
      },
      limit: limit,
      attributes: ['userId', 'bookId', 'score']
    })

    return interestList
  }
  // 新增
  static async add(interest) {
    const res = await Interest.create({
      ...interest
    })

    return res
  }

  // del
  static async del(id) {
    const res = await Interest.destroy({
      where: {
        id: id
      }
    })

    return res
  }

  // mod
  static async mod(interest) {
    const res = await Interest.update({
      ...interest
    }, {
      bookId: interest.bookId,
      userId: interest.userId
    })
  }
}

export default InterestModel