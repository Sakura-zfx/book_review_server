import sequelize from '../../config/connect'

const Like = sequelize.import('../schema/likes.js')

class LikeModel {
  // add
  static async addLike(like) {
    const res = await Like.create({
      ...like
    })

    return res
  }

  // del
  static async delLike(typeId, type, userId) {
    const res = await Like.destroy({
      where: {
        typeId,
        type,
        userId
      }
    })

    return res
  }

  // mod
  static async modLike(like) {
    const res = await Like.update({
      ...like
    }, {
      where: {
        typeId: typeId,
        type: type,
        userId: userId
      }
    })
  }

  // search
  static async getStatus(typeId, type) {
    const like = await Like.findOne({
      where: {
        typeId,
        type,
      },
      attributes: ['typeId', 'status', 'userId']
    })

    return like
  }
}

export default LikeModel