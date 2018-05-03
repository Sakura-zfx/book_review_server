import ReplyModel from '../models/reply'
import {
  FIND_SUCCESS,
  FIND_WRONG,
  ADD_SUCCESS,
  ADD_WRONG,
  DEL_SUCCESS,
  DEL_WRONG
} from '../../utils/constants';

class ReplyController {
  // 获取该条评论下的回复
  static async findRepliesByComment(ctx) {
    const commentId = ctx.params.commentId

    // 首先找出该条评论下的回复
    const replies = ReplyModel.findRepliesByComment(commentId)

    // 获取每条回复下的回复数量
    if (replies) {
      replies.forEach(item => {
        const count = await ReplyModel.getReplyCount_Rep(commentId, item.id)

        item.replyCount = count
      })
    }

    replies !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: replies
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  // 获取某条评论下回复的回复
  static async findRepliesByComment_r(ctx) {
    const commentId = ctx.params.commentId
    const replyId = ctx.params.replyId

    const data = await ReplyModel.findRepliesByReply(commentId, replyId)

    // 获取回复下的回复数量
    if (data) {
      data.forEach(item => {
        const count = await ReplyModel.getReplyCount_Rep(commentId, item.id)

        item.replyCount = count
      })
    }

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: data
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  // add
  static async addReply(ctx) {
    const {
      commentId,
      replyId,
      replyType,
      content,
      fromUd,
      toUid,
      publishTime
    } = {
      ...ctx.request.body
    }

    const data = await ReplyModel.addReply({
      commentId,
      replyId,
      replyType,
      content,
      fromUd,
      toUid,
      publishTime
    })

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG  
    }
  }

  // delete
  static async deleteReply(ctx) {
    const id = ctx.params.id

    const data = await ReplyModel.deleteReply(id)

    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG  
    }
  }
}

export default ReplyController