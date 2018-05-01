import BookModel from '../models/book'
import { FIND_WRONG, FIND_SUCCESS, MOD_SUCCESS, ADD_WRONG, ADD_SUCCESS, DEL_SUCCESS, DEL_WRONG, MOD_WRONG } from '../../utils/constants';

class BookController {
  /**
   * 新增
   */
  static async createBook(ctx) {
    const book = ctx.request.body
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
    const book = ctx.request.book

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

    const book = await BookModel.findBookById(bookId)

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
    const bookName = ctx.query.bookName
    const author = ctx.query.author

    let books = null
    if (bookName) {
      books = await BookModel.findBookByName(bookName)
    } else if (author) {
      books = await BookModel.findBooksByAuthor(author)
    } else {
      ctx.body = {
        code: -90006,
        msg: '参数错误，没有查询条件'
      }
    }

    books !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: books
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }
}

export default BookController