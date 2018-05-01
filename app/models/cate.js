import sequelize from '../../config/connect'

const Cate = sequelize.import('../schema/cates.js')

class CateModel {
  /**
   * 
   * @param {*} cate 
   */
  static async createCate(cate) {
    const res = await Cate.create({
      cateName: cate.cateName
    })
    return res
  }

  /**
   * 
   * @param {*} cateId 
   */
  static async deleteCate(cateId) {
    const res = await Cate.destroy({
      where: {
        id: cateId
      }
    })
    return res
  }

  /**
   * 
   * @param {*} cate 
   */
  static async modifyCate(cate) {
    const res = await Cate.update({
      cateName: cate.cateName
    }, {
      where: {
        id: cate.cateId
      }
      })
    
    return res
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