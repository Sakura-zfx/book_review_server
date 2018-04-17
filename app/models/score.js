import sequelize from '../../config/connect'

const Score = sequelize.import('../schema/book_score.js')

class ScoreModel {
  /**
   * 
   * @param {*} score 
   * @param {*} bookId 
   * @param {*} userId 
   */
  static async addScore(score, bookId, userId) {
    await Score.create({
      score: score,
      bookId: bookId,
      userId: userId,
    })
    return true
  }
  /**
   * 
   * @param {*} score 
   * @param {*} bookId 
   * @param {*} userId 
   */
  static async modifyScore(scoreId, score) {
    await Score.update({
      score: score
    }, {
        where: {
          id: scoreId
        }  
      })
    return true
  }

  /**
   * 
   * @param {*} scoreId 
   */
  static async deleteScore(scoreId) {
    await Score.destroy({
      where: {
        id: scoreId
      }
    })
    return true
  }

  /**
   * 通过bookId,userId获取评分
   */
  static async findScore(bookId, userId) {
    const score = await Score.findOne({
      where: {
        bookId: bookId,
        userId: userId,
      }
    })
    return score
  }

  /**
   * 获取具体书籍下面的评分数据
   */
  static async findScoreByBook(bookId) {
    const scores = await Score.findAll({
      where: {
        bookId: bookId
      }
    })
    return scores
  }

  /**
   * 获取具体用户的评分数据
   */
  static async findScoresByUser(userId) {
    const scores = await Score.findAll({
      where: {
        userId: userId
      }
    })
    return scores
  }
}

export default ScoreModel