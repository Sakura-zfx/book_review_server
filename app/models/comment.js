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
      offset: pageId * limit,
      limit: limit,
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

  /**
   * 增加评论
   */
  static async createComment(comment) {
    const {
      topicId,
      topicType,
      content,
      score,
      bookId,
      fromUid,
      publishTime
    } = {
      ...comment  
    }
    const res = await Comment.create({
      topicId,
      topicType,
      content,
      bookId,
      score,      
      fromUid,
      publishTime
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