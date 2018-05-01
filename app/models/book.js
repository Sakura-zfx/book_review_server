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
  // 通过书籍名查找书籍数组
  static async findBookByName(bookName) {
    const Op = sequelize.Op    
    const books = await Book.findAll({
      where: {
        bookName: {
          [Op.like]: bookName
        }
      }
    })
    return books
  }
  // 通过作者查找书籍数组
  static async findBooksByAuthor(author) {
    const Op = sequelize.Op
    const books = await Book.findAll({
      where: {
        author: {
          [Op.like]: author
        }
      }
    })
    return books
  }

  /**
   * 增加书籍
   */
  static async createBook(book) {
    const {
      bookName,
      bookPic,
      author,
      publishHouse,
      publishDate,
      pageNumber,
      price,
    } = {
      ...book  
    }
    const res = await Book.create({
      bookName,
      bookPic,
      author,
      publishHouse,
      publishDate,
      pageNumber,
      price,
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