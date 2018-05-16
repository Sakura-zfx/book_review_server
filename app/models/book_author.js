import sequelize from '../../config/connect'
const BookAuthor = sequelize.import('../schema/book_author.js')

class BookAuthorModel {
  /**
   * 增加作者图书联系
   */
  static async create(author) {
    const res = await Author.create({
      ...author
    })
    return res
  }
  /**
   * delete
   */
  static async delete(authorId) {
    const res = await Author.destroy({
      where: {
        authorId
      }
    })
    return res
  }
  /**
   * 修改作者信息
   * @param {*} author 
   */
  static async modify(author) {
    const res = await Author.update({
      ...author
    }, {
      where: {
        authorId: author.authorId
      }
    })

    return res
  }

  // 获取书籍的作者
  static async getAuthorsByBook(bookId) {
    const authors = await BookAuthor.findAll({
      where: {
        bookId: bookId
      },
      attributes: ['authorId']
    })

    return authors
  }

  // 获取作者的作品
  static async getBooksByAuthor(authorId, pageId, limit) {
    const books = await BookAuthor.findAndCountAll({
      where: {
        authorId: authorId
      },
      offset: (pageId - 1) * limit,
      limit: limit
    })

    return books
  }
}

export default BookAuthorModel