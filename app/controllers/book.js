import BookModel from '../models/book'
import AuthorModel from '../models/author'
import CommentModel from '../models/comment'
import {
  FIND_WRONG,
  FIND_SUCCESS,
  MOD_SUCCESS,
  ADD_WRONG,
  ADD_SUCCESS,
  DEL_SUCCESS,
  DEL_WRONG,
  MOD_WRONG
} from '../../utils/constants';

class BookController {
  /**
   * 新增
   */
  static async createBook(ctx) {
    const book = ctx.request.body
    const authorList = ctx.request.body.authorList
    let str = ''

    for (let i in authorList) {
      str += `${JSON.stringify(authorList[i])}/`
    }

    book.authorList = str
    // 增加书籍
    const data = await BookModel.createBook(book)

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG
    }
  }
  /**
   * 删除
   */
  static async deleteBook(ctx) {
    const bookId = ctx.params.bookId

    const data = await BookModel.deleteBook(bookId)

    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }
  /**
   * 修改
   */
  static async modifyBook(ctx) {
    const book = ctx.request.body
    const authorList = ctx.request.body.authorList
    let str = ''

    for (let i in authorList) {
      str += `${JSON.stringify(authorList[i])}/`
    }

    book.authorList = str

    const data = await BookModel.modifyBook(book)

    data !== false ? ctx.body = {
      ...MOD_SUCCESS
    } : ctx.body = {
      ...MOD_WRONG
    }
  }
  /**
   * 查询具体的单本书籍
   */
  static async findBookById(ctx) {
    const bookId = ctx.params.bookId

    // 书籍信息
    const book = await BookModel.findBookById(bookId)
    // 作者信息
    const list = book.authorList ? book.authorList.split('/') : []
    book.authorList = []
    for (let i in list) {
      if (list[i]) {
        book.authorList.push(JSON.parse(list[i]))
      }
    }
    // 获取评分信息
    const scoreList = await CommentModel.getScoreByBook(bookId)

    book.setDataValue('scoreList', scoreList)
    const avg = ((scoreList.score_2 * 2) +
        (scoreList.score_4 * 4) + (scoreList.score_6 * 6) +
        (scoreList.score_8 * 8) + (scoreList.score_10 * 10)) /
      (scoreList.score_2 + scoreList.score_4 + scoreList.score_6 + scoreList.score_8 + scoreList.score_10)
    book.setDataValue('avg', avg.toFixed(2))

    book !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: book
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  /**
   * 查询书籍数组
   */
  static async findBooks(ctx) {
    let {
      searchMsg,
      pageId,
      limit
    } = { ...ctx.query
    }

    pageId = pageId ? +pageId : 1
    limit = limit ? limit > 30 ? 30 : +limit : 10

    let books = null
    if (searchMsg) {
      books = await BookModel.findBookBySearch(searchMsg, pageId, limit)
    } else {
      ctx.body = {
        code: -90006,
        msg: '参数错误，没有查询条件'
      }
    }

    // 每本书的信息
    for (let i in books.rows) {
      // 作者信息
      const list = books.rows[i].authorList ? books.rows[i].authorList.split('/') : []

      let temp = []
      for (let j in list) {
        if (list[j]) {
          temp.push(JSON.parse(list[j]))
        }
      }
      // 获取评分信息
      const scoreList = await CommentModel.getScoreByBook(books.rows[i].bookId)

      books.rows[i].setDataValue('scoreList', scoreList)
      const avg = ((scoreList.score_2 * 2) +
          (scoreList.score_4 * 4) + (scoreList.score_6 * 6) +
          (scoreList.score_8 * 8) + (scoreList.score_10 * 10)) /
        (scoreList.score_2 + scoreList.score_4 + scoreList.score_6 + scoreList.score_8 + scoreList.score_10)
        books.rows[i].setDataValue('avg', avg.toFixed(2))

      books.rows[i].setDataValue('authorList', temp)
    }

    books !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: books.count,
      data: books.rows
    } : ctx.body = {
      ...FIND_WRONG
    }
  }
}

export default BookController