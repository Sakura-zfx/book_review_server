import sequelize from '../../config/connect'

const Collection = sequelize.import('../schema/interest.js')
const Book = sequelize.import('../schema/books.js')

class CollectionModel {
  // 获取用户收藏的书籍
  static async getCollectionByUser(userId, pageId, limit) {
    const want = await Collection.findAndCountAll({
      where: {
        userId,
        status: 'want'
      },
      order: [['time', 'DESC']],      
      offset: (pageId - 1) * limit,
      limit: limit,
    })

    if (want) {
      for (let i in want.rows) {
        const book = await Book.findOne({
          where: {
            bookId: want.rows[i].bookId
          }
        })

        want.rows[i].setDataValue('book', book)
      }
    }

    const being = await Collection.findAndCountAll({
      where: {
        userId,
        status: 'being'
      },
      order: [['time', 'DESC']],      
      offset: (pageId - 1) * limit,
      limit: limit
    })

    if (being) {
      for (let i in being.rows) {
        const book = await Book.findOne({
          where: {
            bookId: being.rows[i].bookId
          }
        })

        being.rows[i].setDataValue('book', book)
      }
    }

    const read = await Collection.findAndCountAll({
      where: {
        userId,
        status: 'read'
      },
      order: [['time', 'DESC']],            
      offset: (pageId - 1) * limit,
      limit: limit
    })

    if (read) {
      for (let i in read.rows) {
        const book = await Book.findOne({
          where: {
            bookId: read.rows[i].bookId
          }
        })

        read.rows[i].setDataValue('book', book)
      }
    }
    return {
      want,
      being,
      read
    }
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

  static async modifyCollectionStatus(id, status, score) {
    const res = Collection.update({
      status,
      score,
      time: new Date()
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