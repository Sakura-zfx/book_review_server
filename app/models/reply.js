import sequelize from '../../config/connect'

const Reply = sequelize.import('../schema/replies.js')

class ReplyModel {
  /**
   * 获取某条评论下的所有回复,replyType为comment
   */
  static async findRepliesByComment(commentId, pageId, limit) {
    const replies = await Reply.findAll({
      where: {
        commentId: commentId,
        replyType: 'comment'
      },
      offset: (pageId - 1) * limit,
      limit: limit,
      order: [['publishTime', 'DESC']]
    })

    return replies
  }

  // 获取评论下的回复数量
  static async getReplyCount_Com(commentId) {
    const count = await Reply.count({
      where: {
        commentId: commentId,
        replyType: 'comment'
      }
    })
    return count
  }

  // 获取回复下的回复数量
  static async getReplyCount_Rep(commentId, replyId) {
    const count = await Reply.count({
      where: {
        commentId: commentId,
        replyId: replyId,
        replyType: 'reply'
      }
    })

    return count
  }
  /**
   * 获取某条评论下回复的回复
   */
  static async findRepliesByReply(commentId, replyId, pageId, limit) {
    const replies = await Reply.findAll({
      where: {
        commentId: commentId,
        replyId: replyId,
        replyType: 'reply'
      },
      offset: (pageId - 1) * limit,
      limit: limit
    })
    return replies
  }

  // 获取用户的回复
  static async findUserReplies(userId) {
    const replies = await Reply.findAndCountAll({
      where: {
        fromUid: userId
      },
      order: [['publishTime', 'DESC']]      
    })

    return replies
  }

  /**
   * 新增回复
   */
  static async addReply(reply) {
    const res = await Reply.create({
      ...reply
    })
    return res
  }

  /**
   * 删除回复
   */
  static async deleteReply(id) {
    const res = await Reply.destroy({
      where: {
        id: id
      }
    })

    return res
  }
}

export default ReplyModel