import {
  exec
} from 'child_process'
import CommentModel from '../../models/comment'

class RecommendationController {
  static async getRecBookList(ctx) {
    const userId = ctx.params.userId
    // 获取图书评分矩阵
    const book_user_score = await CommentModel.findCommentsByUserId(userId)
  }
}
const arg1 = 'hello'
const arg2 = 'world'

const fileName = 'test.py'

exec(`python ${fileName} ${arg1} ${arg2}`, function (err, stdout, stderr) {
  if (err) {
    console.log('stderr', err);
  }
  if (stdout) {
    console.log('stdout', stdout);
  }
})