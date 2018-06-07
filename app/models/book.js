import sequelize from '../../config/connect'

const Book = sequelize.import('../schema/books.js')

class BookModel {
  /**
   * 通过书籍id查询书籍
   */
  static async findBookById(bookId) {
    const book = await Book.findOne({
      where: {
        bookId
      }
    })
    return book
  }
  // 获取最新的书籍
  static async getNewList(pageId, limit) {
    const list = await Book.findAll({
      order: [['publishDate', 'DESC']],
      limit: limit,
      offset: (pageId - 1) * limit
    })

    return list
  }
  // 获取全部书籍
  static async getAllBooks() {
    const all = await Book.findAll()

    return all
  }

  // 搜索书籍数组
  static async findBookBySearch(searchMsg, pageId, limit) {
    const Op = sequelize.Op
    let books = []
    if (searchMsg === '-1') {
      books = await Book.findAndCountAll({
        offset: (pageId - 1) * limit,
        limit: limit,
        order: [['publishDate', 'DESC']]
      })
    } else {
      books = await Book.findAndCountAll({
        where: {
          [Op.or]: [{
            bookName: {
              [Op.like]: `%${searchMsg}%`
            }
          }, {
            authorList: {
              [Op.like]: `%${searchMsg}%`
            }
          }, {
            isbn10: searchMsg
          }, {
            isbn13: searchMsg
          }]
        },
        offset: (pageId - 1) * limit,
        limit: limit,
      })
    }  
    return books
  }
  // 获取书籍总数
  static async getNumB() {
    const num = await Book.count()
    return num
  }
  /**
   * 增加书籍
   */
  static async createBook(book) {
    const res = await Book.create({
      ...book
    })

    return res
  }

  /**
   * 修改书籍
   */
  static async modifyBook(book) {
    const res = await Book.update({
      ...book
    }, {
      where: {
        bookId: book.bookId
      }
    })

    return res
  }
  /**
   * 删除书籍
   */
  static async deleteBook(bookId) {
    const res = await Book.destroy({
      where: {
        bookId
      }
    })

    return res
  }
}

export default BookModel