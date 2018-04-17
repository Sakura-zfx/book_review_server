import sequelize from '../../config/connect'

const Tag = sequelize.import('../schema/tags.js')

class TagModel {
  /**
   * 
   * @param {*} tag 
   */
  static async createTag(tag) {
    await Tag.create({
      tagName: tag.tagName,
      cateId: tag.cateId
    })
    return true
  }

  /**
   * 
   * @param {*} tagId 
   */
  static async deleteTag(tagId) {
    await Tag.destroy({
      where: {
        id: tagId
      }
    })
    return true
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
    await Tag.update({
      tagName: tagName,
      cateId: cateId
    }, {
      where: {
        id: tagId
      }
    })
  }
  /**
   * 查询所有标签
   */
  static async findTags() {
    const tags = await Tag.findAll()
    return tags
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
}

return TagModel