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

  static async getCollectionByBook(bookId) {
    const data = await Collection.findAndCountAll({
      where: {
        bookId
      }
    })

    return data
  }

  static async addCollection(collection) {
    const {
      bookId,
      userId,
      collectionTime
    } = {
      ...collection  
    }
    await Collection.create({
      bookId,
      userId,
      collectionTime
    })

    return true
  }

  static async cancelCollection(id) {
    await Collection.destroy({
      where: {
        id
      }
    })

    return true
  }
}

export default CollectionModel