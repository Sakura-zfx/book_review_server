import sequelize from '../../config/connect'

const Comment = sequelize.import('../schema/comments.js')

class CommentModel {
  /**
   * 获取指定书籍下书评(可分页，默认第一页)
   * @param {Number} bookId 书籍id
   * @param {String} topicType 评论是针对谁的（书籍，用户）
   * @param {Number} topicId 评论类型（书评2，短评1）
   * @param {Number} pageId 页数
   * @param {Number} limit 每页的数量
   */ 
  static async findCommentByBook(searchMsg) {
    const {
      bookId,
      topicType,
      topicId,
      pageId,
      limit,
      order,
    } = {
      ...searchMsg  
      }
    // 构造查询体
    const where = {}
    bookId ? where.bookId = bookId : ''
    topicType ? where.topicType = topicType : ''
    topicId ? where.topicId = topicId : ''    

    const comments = await Comment.findAndCountAll({
      where: where,
      offset: (pageId - 1) * limit,
      limit: +limit,
      order: [['publishTime', order]],
    })
    return comments
  }
  /**
   * 通过用户获取评论
   * @param {*} userId 
   */
  static async findCommentsByUserId(userId) {
    const comments = await Comment.findAndCountAll({
      where: {
        fromUid: userId
      }
    })
    return comments
  }
  // 获取书籍下的评分信息
  static async getScoreByBook(bookId) {
    // 2, 4, 6, 8, 10
    const score_2 = await Comment.count({
      where: {
        bookId: bookId,
        topicType: 'book',
        score: 2
      }
    })
    const score_4 = await Comment.count({
      where: {
        bookId: bookId,
        topicType: 'book',        
        score: 4
      }
    })
    const score_6 = await Comment.count({
      where: {
        bookId: bookId,
        topicType: 'book',        
        score: 6
      }
    })
    const score_8 = await Comment.count({
      where: {
        bookId: bookId,
        topicType: 'book',        
        score: 8
      }
    })
    const score_10 = await Comment.count({
      where: {
        bookId: bookId,
        topicType: 'book',        
        score: 10
      }
    })

    return {
      score_2,
      score_4,
      score_6,
      score_8,
      score_10
    }
  }
  /**
   * 增加评论
   */
  static async createComment(comment) {
    const res = await Comment.create({
      ...comment
    })
    return res
  }

  /**
   * 修改评论(暂时不做)
   */
  static async modifyComment(comment) {
    const res = await Comment.update({
      ...comment
    }, {
        where: {
        id: comment.id
      }  
      })
    return res
  }
  /**
   * 删除评论
   */
  static async deleteComment(commentId) {
    const res = await Comment.destroy({
      where: {
        id: commentId
      }
    })
    return res
  }
}

export default CommentModel