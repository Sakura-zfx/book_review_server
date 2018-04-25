import CommentModel from '../models/comment'

class CommentController {
  static async getBookComments(ctx) {
    const bookId = ctx.params.bookId

    const data = await CommentModel.findCommentByBook(searchMsg)
    ctx.body = {
      code: 200,
      msg: 'success',
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