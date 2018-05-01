import sequelize from '../../config/connect'
const Author = sequelize.import('../schema/authors.js')

class AuthorModel {
  /**
   * 增加作者
   */
  static async createAuthor(author) {
    await Author.create({
      ...author
    })
    return true
  }
  /**
   * delete
   */
  static async deleteAuthor(authorId) {
    await Author.destroy({
      where: {
        authorId
      }
    })
    return true
  }
  /**
   * 修改作者信息
   * @param {*} author 
   */
  static async modifyAuthor(author) {
    await Author.update({
      ...author
    }, {
      where: {
        authorId: author.authorId
      }
      })
    
    return true
  }
  /**
   * search
   */
  static async findAuthorById(authorId) {
    const author = await Author.findOne({
      where: {
        authorId
      }
    })

    return author
  }

  static async findAuthorByName(authorName) {
    const Op = sequelize.Op
    const authors = await Author.findAndCountAll({
      where: {
        authorName: {
          [Op.like]: authorName       
        }
      }
    })

    return authors
  }
}

export default AuthorModel