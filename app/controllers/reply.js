import ReplyModel from '../models/reply'
import UserModel from '../models/user'
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
    let {pageId, limit} = {...ctx.query}

    pageId = pageId ? +pageId : 1
    limit = limit ? +limit : 10
    // 首先找出该条评论下的回复
    const replies = await ReplyModel.findRepliesByComment(+commentId, pageId, limit)

    if (replies) {
      for (let i in replies) {
        // 获取每条回复下的回复数量        
        const count = await ReplyModel.getReplyCount_Rep(+commentId, +replies[i].id)
        replies[i].setDataValue('replyCount', count)

        // 获取用户信息
        const fromUser = await UserModel.findUserByOther(+replies[i].fromUid)
        replies[i].setDataValue('fromUser', fromUser)
        const toUser = await UserModel.findUserByOther(+replies[i].toUid)
        replies[i].setDataValue('toUser', toUser)
      }
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
    const commentId = +ctx.params.commentId
    const replyId = +ctx.params.replyId
    let {pageId, limit} = {...ctx.query}

    pageId = pageId ? +pageId : 1
    limit = limit ? +limit : 10

    const data = await ReplyModel.findRepliesByReply(commentId, replyId, pageId, limit)

    // 获取回复下的回复数量
    if (data) {
      for (let i in data) {
        const count = await ReplyModel.getReplyCount_Rep(commentId, data[i].id)

        data[i].setDataValue('replyCount', count)
      }
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
      fromUid,
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
      fromUid,
      toUid,
      publishTime: new Date()
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