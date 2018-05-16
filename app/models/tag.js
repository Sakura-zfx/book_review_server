import sequelize from '../../config/connect'

const Tag = sequelize.import('../schema/tags.js')

class TagModel {
  /**
   * add
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
   * del
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
   * mod
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
    const name = await Tag.findOne({
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
}

export default TagModel