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
    const sql = 'select cateId, COUNT(id) count from tags group by cateId having count order by count DESC limit 10'

    const tags = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
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
  // 获取标签总素
  static async getNumT() {
    const num = await Tag.count()
    return num
  }
  // 获取分类下的标签数量
  static async getCountByCate(cateId) {
    const tag = await Tag.find({
      where: {
        cateId
      },
      attributes: ['cateId', [sequelize.fn('COUNT', sequelize.col('cateId')), 'count']],
      group: ['cateId']
    })
    return tag
  }
  /**
   * 根据类别查询标签
   */
  static async findTagsByCate(cateId) {
    const tags = await Tag.findAll({
      where: {
        cateId: cateId
      },
      attributes: ['id', 'tagName']
    })
    return tags
  }
}

export default TagModel