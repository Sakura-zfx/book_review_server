import sequelize from '../../config/connect'

const BookTag = sequelize.import('../schema/book_tag.js')

class BookTagModel {
  // 新增tag
  static async addTag(tag) {
    const res = await BookTag.create({
      ...tag
    })

    return res
  }
  // delete
  static async delTag(id) {
    const res = await BookTag.destroy({
      where: {
        id
      }
    })

    return res
  }
  // mod
  static async modTag(tag) {
    const res = await BookTag.update({
      ...tag
    }, {
      where: {
        id: tag.id
      }
    })

    return res
  }

  // 书籍下的标签
  static async getTagsByBook(bookId) {
    const tags = await BookTag.findAndCountAll({
      where: {
        bookId: bookId
      },
      attributes: ['tagId']
    })
    return tags
  }
  // 标签下的书籍
  static async getBooksByTag(tagId, pageId, limit) {
    const books = await BookTag.findAndCountAll({
      where: {
        tagId: tagId
      },
      offset: (pageId - 1) * limit,
      limit: limit,
      attributes: ['bookId']
    })
  }
  // 标签下的书籍数量
  static async getBooksCount(tagId) {
    const count = await BookTag.count({
      where: {
        tagId: tagId
      }
    })
    return count
  }

}

export default BookTagModel