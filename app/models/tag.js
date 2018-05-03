import sequelize from '../../config/connect'

const Tag = sequelize.import('../schema/tags.js')
const Book_Tag = sequelize.import('../schema/book_tag.js')

class TagModel {
  /**
   * 
   * @param {*} tag 
   */
  static async createTag(tag) {
    const res = await Tag.create({
      tagName: tag.tagName,
      cateId: tag.cateId
    })
    return res
  }

  /**
   * 
   * @param {*} tagId 
   */
  static async deleteTag(tagId) {
    const res = await Tag.destroy({
      where: {
        id: tagId
      }
    })
    return res
  }

  /**
   * 
   * @param {*} tag 
   */
  static async modifyTag(tag) {
    const {
      tagId,
      tagName,
      cateId,
    } = { ...tag
    }
    const res = await Tag.update({
      tagName: tagName,
      cateId: cateId
    }, {
      where: {
        id: tagId
      }
    })
    return res
  }
  /**
   * 查询所有标签
   */
  static async findTags() {
    const tags = await Tag.findAll()
    return tags
  }
  // 查询标签名字
  static async getTagName(tagId) {
    const name = await Tag.findAll({
      where: {
        id: tagId
      }
    })

    return name
  }

  /**
   * 根据类别查询标签
   */
  static async findTagsByCate(cateId) {
    const tags = await Tag.findAll({
      where: {
        cateId: cateId
      }
    })
    return tags
  }

  // 获取书籍下的tags
  static async findTagsByBook(bookId) {
    const tags = await Book_Tag.findAll({
      where: {
        bookId: bookId
      },
      attributes: ['tagId']
    })
    return tags
  }

  // 获取tag下的书籍数量
  static async getBookCount(tagId) {
    const count = await Book_Tag.count({
      where: {
        tagId: tagId
      }
    })

    return count
  }
}

export default TagModel