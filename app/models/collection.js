import sequelize from '../../config/connect'

const Collection = sequelize.import('../schema/book_collection.js')

class CollectionModel {
  static async getCollectionByUser(userId) {
    const data = await Collection.findAndCountAll()({
      where: {
        userId
      }
    })

    return data
  }

  static async getCountByBook(bookId) {
    const count = await Collection.count({
      where: {
        bookId
      }
    })

    return count
  }

  // 获取用户对当前书籍的收藏状态
  static async getStatus(search) {
    const {
      bookId,
      userId
    } = {
      ...search
    }

    const data = await Collection.findOne({
      where: {
        bookId,
        userId
      }
    })

    return data
  }

  static async addCollection(collection) {
    const {
      bookId,
      userId,
      status,
      collectionTime
    } = {
      ...collection
    }
    const res = await Collection.create({
      bookId,
      userId,
      status,
      collectionTime
    })

    return res
  }

  static async modifyCollectionStatus(id, status) {
    const res = Collection.update({
      status
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