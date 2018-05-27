import sequelize from '../../config/connect'
import { stat } from 'fs';

const User = sequelize.import('../schema/users.js')
const Auth = sequelize.import('../schema/user_auths.js')

class UserModel {
  // 获取用户注册人数等信息
  static async getNumU() {
    const Op = sequelize.Op
    const date = new Date()
    
    const total = await User.count()
    
    const last_7_active = await Auth.count({
      where: {
        loginTime: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000 )
        }
      }
    })
    
    const last_7_re = await User.count({
      where: {
        registerDate: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000 )          
        }
      }
    })

    return {
      total,
      last_7_active,
      last_7_re
    }
  }
  // 增加登录信息  
  static async addAuth(data) {
    const res = await Auth.create({
      ...data
    })

    return res
  }

  // 删除用户登录信息
  static async deleteAuth(userId) {
    const res = await Auth.destroy({
      where: {
        userId
      }
    })
  }

  // 修改登录信息
  static async modifyAuth(data, where) {
    const res = await Auth.update({
      ...data
    }, {
      where: {
        ...where
      }
    })

    return res
  }

  // 查询登录信息
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
    if (userInfo) {
      const authInfo = await Auth.findAll({
        where: {
          userId
        },
        attributes: ['identityType', 'identity', 'userRole', 'status', 'loginTime']
      })
      userInfo.setDataValue('userRole', authInfo[0].userRole)
      userInfo.setDataValue('status', authInfo[0].status)
      userInfo.setDataValue('lastLoginTime', authInfo[0].loginTime)
      userInfo.setDataValue('email', '')
      userInfo.setDataValue('phone', '')

      authInfo.map(item => {
        if (item.identityType === 'email') {
          userInfo.setDataValue('email', item.identity)
        } else if (item.identityType === 'phone') {
          userInfo.setDataValue('phone', item.identity)
        }
      })
    }  
    return userInfo
  }

  /**
   * 新建用户
   * @param {Object} user{ nickName, picture, userGender, tureName, birth, address, registerDate}
   * @returns
   */
  static async createUser(user) {
    await User.create({
      nickName: user.nickName,
      registerDate: new Date()
    }).then(async () => {
      const newUser = await User.findOne({
        where: {
          nickName: user.nickName
        }
      })
      await Auth.create({
        userId: newUser.userId,
        identityType: user.identityType,
        identity: user.identity,
        credential: user.credential,
        userRole: user.userRole,
        status: 0,
      })
    })
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
    return true
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

  // 分页获取用户 userRole: 0全部  1普通用户 2管理员
  static async getUserList(userRole, pageId, limit) {
    const userList = +userRole === 0 ? await User.findAndCountAll({
      offset: (pageId - 1) * limit,
      limit: limit,
      attributes: ['userId']
    }) : await Auth.findAndCountAll({
      where: {
        userRole: userRole
      },
      offset: (pageId - 1) * limit,
      limit: limit,
      attributes: [[sequelize.literal('distinct `userId`'), 'userId']]
      })
    
    for (let index in userList.rows) {
      const each = await this.findUserById(userList.rows[index].userId)
      userList.rows[index] = each
    }
    return userList
  }

  // 获取封禁人员
  static async getBanlist(status, pageId, limit) {
    const userList = await Auth.findAndCountAll({
      where: {
        status: status
      },
      offset: (pageId - 1) * limit,
      limit: limit,
      attributes: [[sequelize.literal('distinct `userId`'), 'userId']]
    })

    for (let index in userList.rows) {
      const each = await this.findUserById(userList.rows[index].userId)
      userList.rows[index] = each
    }
    return userList
  }
  static async verifyUser(identity) {
    const user = await Auth.findOne({
      where: {
        identity: identity
      }
    })
    return user
  }
  // 搜索用户列表
  static async searchUser(searchMsg) {
    const Op = sequelize.Op
    const userList1 = await Auth.findAll({
      where: {
        identity: {
          [Op.like]: `%${searchMsg}%`
        }
      },
      attributes: [[sequelize.literal('distinct `userId`'), 'userId']]
    })
    const userList2 = await User.findAll({
      where: {
        nickName: {
          [Op.like]: `%${searchMsg}%`
        }
      },
      attributes: [[sequelize.literal('distinct `userId`'), 'userId']]
    })

    const userList = []
    
    userList1.map(item => {
      userList.push(item.userId)
    })

    userList2.map(item => {
      userList.indexOf(item.userId) < 0 && userList.push(item.userId)
    })

    userList.sort()
    for (let index in userList) {
      const each = await this.findUserById(userList[index])
      userList[index] = each
    }
    return userList
  }
}

export default UserModel