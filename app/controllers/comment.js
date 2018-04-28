import CommentModel from '../models/comment'
import ReplyModel from '../models/reply'

class CommentController {
  static async getBookComments(ctx) {
    const bookId = ctx.params.bookId
    
    // 获取短评
    const shortComments = await CommentModel.findCommentByBook({
      bookId,
      topicType: '',
      topicId: 1
    })
    // 获取书评
    const bookComments = await CommentModel.findCommentByBook({
      bookId,
      topicType: '',
      topicId: 2
    })
    ctx.body = {
      code: 200,
      msg: 'success',
      data: {
        shortComments,
        bookComments
      }
    }
  }

  static async getUserComments(ctx) {
    const userId = ctx.params.userId

    const data = await CommentModel.findCommentsByUserId(userId)

    ctx.body = {
      code: 200,
      msg: 'success',
      data: data
    }
  }
}

export default CommentController