import sequelize from '../../config/connect'

const Reply = sequelize.import('../schema/replies.js')

class ReplyModel {
  /**
   * 获取某条评论下的所有回复,replyType为comment
   */
  static async findRepliesByComment(commentId) {
    const replies = await Reply.findAndCountAll({
      where: {
        commentId: commentId,
        replyType: 'comment'
      }
    })
    return replies
  }

  /**
   * 获取某条评论下回复的回复
   */
  static async findRepliesByReply(commentId, replyId) {
    const replies = await Reply.findAndCountAll({
      where: {
        commentId: commentId,
        replyId: replyId,
        replyType: 'reply'
      }
    })
    return replies
  }
  /**
   * 新增回复
   */
  static async addReply(reply) {
    await Reply.create({
      ...reply
    })
    return true
  }

  /**
   * 删除回复
   */
  static async deleteReply(id) {
    await Reply.destroy({
      where: {
        id: id
      }
    })
  }
}

export default ReplyModel