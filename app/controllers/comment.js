import CommentModel from '../models/comment'
import ReplyModel from '../models/reply'
import { 
  DEL_SUCCESS,
  ADD_SUCCESS,
  FIND_SUCCESS,
  DEL_WRONG,
  ADD_WRONG,
  FIND_WRONG
} from '../../utils/constants'

class CommentController {
  static async getBookComments(ctx) {
    const bookId = ctx.params.bookId

    const topicId = ctx.query.topicId
    let order = ctx.query.order // 排序: 1->ASC升序 0->DESC
    let pageId = ctx.query.pageId
    let limit = ctx.query.limit

    order = order ? 'ASC' : 'DESC'
    pageId = pageId ? 1 : pageId
    limit = limit > 20 ? 20 : limit
    
    let commentsData = []
    // 获取短评
    if (+topicId === 1) {
      commentsData = await CommentModel.findCommentByBook({
        bookId,
        topicType: '',
        topicId: 1,
        pageId,
        limit,
        order,
      })
    } else if(+topicId === 2) {
      // 获取书评
      commentsData = await CommentModel.findCommentByBook({
        bookId,
        topicType: '',
        topicId: 2,
        pageId,
        limit,
        order,
      })
    } else {
      commentsData = await CommentModel.findCommentByBook({
        bookId,
        topicType: '',
        topicId: 0,
        pageId,
        limit,
        order
      })
    }
    // 获取评论下的回复数量
    if (commentsData) {
      commentsData.rows.forEach(async (item) => {
        const commentId = item.id
        const count_reply = await ReplyModel.getReplyCount_Com(commentId)

        item.replyCount = count_reply
      })
    }  
    
    commentsData !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: commentsData.count,      
      data: commentsData.rows
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }

  // 获取用户的评论与回复
  static async getUserComments(ctx) {
    const userId = ctx.params.userId

    const c_data = await CommentModel.findCommentsByUserId(userId)

    const r_data = await ReplyModel.findUserReplies(userId)

    const data = {
      cData: c_data.rows,
      rData: r_data.rows
    }

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: c_data.count + r_data.count,
      data: data
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }

  static async createComment(ctx) {
    const {
      topicId,
      topicType,
      content,
      score,      
      bookId,
      fromUid,
      publishTime
    } = {
      ...ctx.request.body  
      }
    
    const data = await CommentModel.createComment({
      topicId,
      topicType,
      content,
      score,      
      bookId,
      fromUid,
      publishTime
    })

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG  
    }
  }

  static async deleteComment(ctx) {
    const commentId = cxt.params.commentId

    const data = await CommentModel.deleteComment(commentId)
    
    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }
}

export default CommentController