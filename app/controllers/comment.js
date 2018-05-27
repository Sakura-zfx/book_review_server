import CommentModel from '../models/comment'
import ReplyModel from '../models/reply'
import InterestModel from '../models/interest'
import BookModel from '../models/book'
import UserModel from '../models/user'
import { 
  DEL_SUCCESS,
  ADD_SUCCESS,
  FIND_SUCCESS,
  DEL_WRONG,
  ADD_WRONG,
  FIND_WRONG,
  PARAMS_WRONG,
  MOD_SUCCESS,
  MOD_WRONG
} from '../../utils/constants'

class CommentController {
  static async getBookComments(ctx) {
    const bookId = +ctx.params.bookId

    const topicId = +ctx.query.topicId
    let order = ctx.query.order // 排序: 1->ASC升序 0->DESC
    let pageId = ctx.query.pageId
    let limit = ctx.query.limit

    order = order ? 'ASC' : 'DESC'
    pageId = pageId ? +pageId : 1
    limit = limit ? limit > 20 ? 20 : +limit : 10
    
    let commentsData = []
    // 获取短评
    if (+topicId === 1) {
      commentsData = await CommentModel.findCommentByBook({
        bookId,
        topicType: 'book',
        topicId: 1,
        pageId,
        limit,
        order,
      })
    } else if(+topicId === 2) {
      // 获取书评
      commentsData = await CommentModel.findCommentByBook({
        bookId,
        topicType: 'book',
        topicId: 2,
        pageId,
        limit,
        order,
      })
    } else {
      commentsData = await CommentModel.findCommentByBook({
        bookId,
        topicType: 'book',
        topicId: 0,
        pageId,
        limit,
        order
      })
    }
    // 获取评论下的回复数量
    if (commentsData.rows) {
      for (let i in commentsData.rows) {
        const commentId = commentsData.rows[i].id
        // interest
        const interest = await InterestModel.getInterest(+commentsData.rows[i].fromUid, +bookId)
      
        const count_reply = await ReplyModel.getReplyCount_Com(+commentId)

        commentsData.rows[i].setDataValue('replyCount', count_reply)
        commentsData.rows[i].setDataValue('interest', interest)   
        
        // 获取书籍名称和用户昵称
        const userId = commentsData.rows[i].fromUid
        const user = await UserModel.findUserById(+userId)
        commentsData.rows[i].setDataValue('userName', user.nickName)           

        const book = await BookModel.findBookById(+bookId)
        commentsData.rows[i].setDataValue('bookName', book.bookName)   
      }
    }  
    
    commentsData !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: commentsData.count,      
      data: commentsData.rows
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }
  // 获取用户对某本书的评论信息
  static async getCUser2Book(ctx) {
    const fromUid = ctx.query.fromUid
    const bookId = ctx.query.bookId
    const topicId = ctx.query.topicId

    if (fromUid && bookId) {
      // 获取评分
      const interest = await InterestModel.getInterest(+fromUid, +bookId)

      const comment = await CommentModel.getCUser2Book(+fromUid, +bookId, +topicId)
      comment.setDataValue('interest', interest)
      
      comment !== false ? ctx.body = {
        ...FIND_SUCCESS,
        data: comment
      } : ctx.body = {
        ...FIND_WRONG  
      }
    } else {
      ctx.body = {
        ...PARAMS_WRONG
      }
    }
  }

  static async getCommentsNew(ctx) {
    const data = await CommentModel.getCommentsNew()
    const { short_c, book_c } = { ...data }
    // interest
    if (short_c) {
      for (let i in short_c) {
        const interest = await InterestModel.getInterest(+short_c[i].fromUid, +short_c[i].bookId)
        short_c[i].interest = interest
      }
    }
    if (book_c) {
      for (let i in book_c) {
        const interest = await InterestModel.getInterest(+book_c[i].fromUid, +book_c[i].bookId)
        book_c[i].interest = interest
      }
    }
    
    ctx.body = {
      ...FIND_SUCCESS,
      data: {
        ...data
      }
    }
  }
  // 获取用户的评论与回复
  static async getUserComments(ctx) {
    const userId = ctx.params.userId

    const c_data = await CommentModel.findCommentsByUserId(+userId)

    const r_data = await ReplyModel.findUserReplies(+userId)

    // interest
    if (c_data.rows) {
      for (let i in c_data.rows) {
        const interest = await InterestModel.getInterest(+c_data.rows[i].fromUid, +c_data.rows[i].bookId)
        c_data.rows[i].setDataValue('interest', interest)

        // 获取书籍名称和用户昵称
        const user = await UserModel.findUserById(+userId)
        c_data.rows[i].setDataValue('userName', user.nickName)           

        const bookId = c_data.rows[i].bookId
        const book = await BookModel.findBookById(+bookId)
        c_data.rows[i].setDataValue('bookName', book.bookName)
      }
    }
    
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
      title,
      score,      
      bookId,
      fromUid,
    } = {
      ...ctx.request.body  
      }
    // 检查是否已存在
    const isExist = await CommentModel.getCUser2Book(+fromUid, +bookId)
    if (isExist) {
      // 修改
      const data = await CommentModel.modifyComment({
        topicId,
        topicType,
        title,
        content,
        score,
        bookId: +bookId,
        fromUid: +fromUid,
        publishTime: new Date()
      })

      data !== false ? ctx.body = {
        ...MOD_SUCCESS
      } : ctx.body = {
        ...MOD_WRONG
      }
    } else {
      const data = await CommentModel.createComment({
        topicId,
        topicType,
        title,
        content,
        score,
        bookId: +bookId,
        fromUid: +fromUid,
        publishTime: new Date()
      })

      data !== false ? ctx.body = {
        ...ADD_SUCCESS
      } : ctx.body = {
        ...ADD_WRONG  
      }
    }
  }

  static async deleteComment(ctx) {
    const commentId = ctx.params.commentId

    const data = await CommentModel.deleteComment(+commentId)
    
    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }
}

export default CommentController