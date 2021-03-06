import sequelize from '../../config/connect'
const Author = sequelize.import('../schema/authors.js')

class AuthorModel {
  /**
   * 增加作者
   */
  static async createAuthor(author) {
    const res = await Author.create({
      ...author
    })
    return res
  }
  /**
   * delete
   */
  static async deleteAuthor(authorId) {
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
  static async modifyAuthor(author) {
    const res = await Author.update({
      ...author
    }, {
      where: {
        authorId: author.authorId
      }
    })

    return res
  }
  /**
   * search
   */
  static async getAuthorList(pageId, limit) {
    const authors = await Author.findAndCountAll({
      offset: (pageId - 1) * limit,
      limit: limit
    })

    return authors
  }

  static async findAuthorById(authorId) {
    const author = await Author.findOne({
      where: {
        authorId
      }
    })

    return author
  }

  static async findAuthorByName(authorName, pageId, limit) {
    const Op = sequelize.Op
    const authors = await Author.findAndCountAll({
      where: {
        authorName: {
          [Op.like]: `%${authorName}%`
        }
      },
      offset: (pageId - 1) * limit,
      limit: limit
    })

    return authors
  }
}

export default AuthorModel