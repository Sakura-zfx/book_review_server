import sequelize from '../../config/connect'

const Cate = sequelize.import('../schema/cates.js')

class CateModel {
  /**
   * add
   * @param {*} cate 
   */
  static async createCate(cate) {
    const isExsit = await Cate.findOne({
      where: {
        cateName: cate.cateName
      }
    })
    if (isExsit) {
      return -1
    } else {
      const res = await Cate.create({
        ...cate
      })
      return res
    }
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

  // 获取id的名称
  static async getCate(cateId) {
    const cate = await Cate.findOne({
      where: {
        id: cateId
      }
    })
    return cate
  }
}

export default CateModel