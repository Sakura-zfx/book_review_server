import sequelize from '../../config/connect'

const Collection = sequelize.import('../schema/book_collection.js')

class CollectionModel {
  // 获取用户收藏的书籍
  static async getCollectionByUser(userId, pageId, limit) {
    const collection = await Collection.findAndCountAll({
      where: {
        userId
      },
      offset: (pageId - 1) * limit,
      limit: limit
    })

    return collection
  }
  // 获取书籍被收藏数
  static async getCountByBook(bookId) {
    const count = await Collection.count({
      where: {
        bookId
      },

    })

    return count
  }

  // 获取用户对当前书籍的收藏状态
  static async getStatus(bookId, userId) {
    const status = await Collection.findOne({
      where: {
        bookId,
        userId
      },
    })

    return status
  }

  static async addCollection(collection) {
    const res = await Collection.create({
      ...collection
    })

    return res
  }

  static async modifyCollectionStatus(id, status) {
    const res = Collection.update({
      status,
      collectionTime: new Date()
    }, {
      where: {
        id
      }
    })

    return res
  }

  static async cancelCollection(id) {
    const res = await Collection.destroy({
      where: {
        id
      }
    })

    return res
  }
}

export default CollectionModel