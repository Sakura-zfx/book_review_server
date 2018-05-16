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

  // 搜索书籍数组 @return bookId 数组
  static async findBookBySearch(searchMsg, pageId, limit) {
    const Op = sequelize.Op
    const books = await Book.findAndCountAll({
      where: {
        [Op.or]: [{
          bookName: {
            [Op.like]: `%${searchMsg}%`
          }
        }, {
          author: {
            [Op.like]: `%${searchMsg}%`
          }
        }, {
          isbn10: searchMsg
        }, {
          isbn13: searchMsg
        }]
      },
      attributes: ['bookId'],
      offset: (pageId - 1) * limit,
      limit: limit,
    })
    return books
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