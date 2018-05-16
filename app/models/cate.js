import sequelize from '../../config/connect'

const Cate = sequelize.import('../schema/cates.js')

class CateModel {
  /**
   * add
   * @param {*} cate 
   */
  static async createCate(cate) {
    const res = await Cate.create({
     ...cate
    })
    return res
  }

  /**
   * del
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
   * mod
   * @param {*} cate 
   */
  static async modifyCate(cate) {
    const res = await Cate.update({
      ...cate
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

export default CateModel