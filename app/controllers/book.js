import BookModel from '../models/book'

class BookController {
  /**
   * 新增
   */
  static async createBook(ctx) {
    const book = ctx.request.body
    // 增加书籍
    await BookModel.createBook(book)

    ctx.body = {
      code: 200,
      msg: 'create success'
    }

  }
  /**
   * 删除
   */
  static async deleteBook(ctx) {
    const bookId = ctx.params.bookId

    await BookModel.deleteBook(bookId)

    ctx.body = {
      code: 200,
      msg: 'delete success'
    }
  }
  /**
   * 修改
   */
  static async modifyBook(ctx) {
    const book = ctx.request.book

    await BookModel.modifyBook(book)

    ctx.body = {
      code: 200,
      msg: 'modify success'
    }
  }
  /**
   * 查询具体的单本书籍
   */
  static async findBookById(ctx) {
    const bookId = ctx.params.bookId

    const book = await BookModel.findBookById(bookId)

    ctx.body = {
      code: 200,
      msg: 'search success',
      data: book
    }
  }

  /**
   * 查询书籍数组
   */
  static async findBooks(ctx) {
    const bookName = ctx.query.bookName
    const author = ctx.query.author

    const books
    if (bookName) {
      books = await BookModel.findBookByName(bookName)
    } else if (author) {
      books = await BookModel.findBooksByAuthor(author)
    }

    ctx.body = {
      code: 200,
      msg: 'search success',
      data: books
    }
  }
}

export default BookController