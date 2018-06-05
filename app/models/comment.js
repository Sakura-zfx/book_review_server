import sequelize from '../../config/connect'

const Comment = sequelize.import('../schema/comments.js')

class CommentModel {
  // 获取最新的书评和短评
  static async getCommentsNew() {
    const sql = 'select c.*, b.bookName, u.nickName from comments as c, books as b, users as u where c.topicId = :topicId and c.topicType = :topicType and c.bookId = b.bookId and c.fromUid = u.userId ORDER BY c.publishTime DESC LIMIT 10'

    const short_c = await sequelize.query(sql, {
      replacements: {
        topicId: 1,
        topicType: 'book'
      },
      type: sequelize.QueryTypes.SELECT
    })

    const book_c = await sequelize.query(sql, {
      replacements: {
        topicId: 2,
        topicType: 'book'
      },
      type: sequelize.QueryTypes.SELECT
    })

    return {
      short_c,
      book_c
    }
  }
  // 获取书评总数
  static async getNumB_c(topicId) {
    const num = await Comment.count({
      where: {
        topicId: topicId,
        topicType: 'book'
      }
    })

    return num
  }
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
      order: [['publishTime', order]]
    })
    return comments
  }
  /**
   * 通过用户获取评论
   * @param {*} fromUid 
   */
  static async findCommentsByUserId(fromUid) {
    const comments = await Comment.findAndCountAll({
      where: {
        fromUid: fromUid
      },
      order: [['publishTime', 'DESC']]      
    })
    return comments
  }
  // 获取用户对某本书籍的评论
  static async getCUser2Book(fromUid, bookId, topicId) {
    const comment = await Comment.findOne({
      where: {
        fromUid: fromUid,
        bookId: bookId,
        topicId: topicId
      },
      order: [['publishTime', 'DESC']]
    })

    return comment
  }
  // 通过id获取
  static async getCommentDetail(id) {
    const list = await Comment.findOne({
      where: {
        id: id
      }
    })
    return list
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
   * 修改评论,user和book,topicId确定唯一数据
   */
  static async modifyComment(comment) {
    const res = await Comment.update({
      ...comment
    }, {
      where: {
        bookId: comment.bookId,
        fromUid: comment.fromUid,
        topicId: comment.topicId
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