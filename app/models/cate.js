import sequelize from '../../config/connect'

const Cate = sequelize.import('../schema/cates.js')

class CateModel {
  /**
   * 
   * @param {*} cate 
   */
  static async createCate(cate) {
    await Cate.create({
      cateName: cate.cateName
    })
    return true
  }

  /**
   * 
   * @param {*} cateId 
   */
  static async deleteCate(cateId) {
    await Cate.destroy({
      where: {
        id: cateId
      }
    })
    return true
  }

  /**
   * 
   * @param {*} cate 
   */
  static async modifyCate(cate) {
    const {
      cateId,
      cateName
    } = { ...cate
    }
    await Cate.update({
      cateName: cateName
    }, {
      where: {
        id: cateId
      }
    })
  }
  /**
   * 查询所有类别
   */
  static async findCates() {
    const cates = await Cate.findAll()
    return cates
  }
}

return CateModel