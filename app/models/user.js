import sequelize from '../../config/connect'

const User = sequelize.import('../schema/users.js')
const Auth = sequelize.import('../schema/user_auths.js')

class UserModel {
  /**
   * 获取登录
   * 
   */
  static async getAuth(loginMsg) {
    // 获取登录信息中的字段
    const {
      identity,
      credential,
      userRole
    } = {
      ...loginMsg
    }

    const loginAuth = await Auth.findOne({
      where: {
        identity,
        userRole
      }
    })

    return loginAuth
  }

  /**
   * 
   */

  /**
   * 查找用户信息
   * @param {String} userId 用户id
   * @returns {Object} userInfo 用户信息
   */
  static async findUserById(userId) {
    const userInfo = await User.findOne({
      where: {
        userId
      }
    })
    return userInfo
  }

  /**
   * 新建用户
   * @param {Object} user{ nickName, picture, userGender, tureName, birth, address, registerDate}
   * @returns
   */
  static async createUser(user) {
    await User.create({
      nickName: user.nickName
    }).then(async () => {
      await User.findOne({
        where: {
          nickName: user.nickName
        }
      }).then(async (newUser) => {
        await Auth.create({
          where: {
            userId: newUser.userId,
            identityType: user.identityType,
            identity: user.identity,
            credential: user.credential,
            userRole: user.userRole,
            status: 0,
          }
        })
      })
    })
    // TODO: 将登录信息添加进user_auths
    return true
  }

  /**
   * 修改用户信息
   */
  static async modifyUser(user) {
    await User.update({
      ...user
    }, {
      where: {
        userId: user.userId
      }
    })
  }

  /**
   * 删除用户
   * 
   */
  static async deleteUser(userId) {
    await User.destroy({
      where: {
        userId
      }
    }).then(async () => {
      await Auth.destroy({
        where: {
          userId
        }
      })
    })
    return true
  }
}

export default UserModel