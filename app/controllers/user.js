import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import {
  secret
} from '../../config/secret'
import UserModel from '../models/user';
import {
  PASSWORD_WRONG,
  USER_NOT_EXIST,
  USER_PERMISSION_ERROR,
  USER_HAS_BEEN_BANNED,
  USER_HAS_EXIST,
  FIND_SUCCESS,
  FIND_WRONG
} from '../../utils/constants'

class UserController {
  /**
   * 登录
   */
  static async postLogin(ctx) {
    const loginMsg = ctx.request.body
    const loginAuth = await UserModel.getAuth(loginMsg)
    if (loginAuth) {
      if (bcrypt.compareSync(loginMsg.credential, loginAuth.credential)) {
        const user = await UserModel.findUserById(loginAuth.userId)
        const userToken = {
          userId: user.userId,
          userName: user.nickName
        }
        const token = jwt.sign(userToken, secret, {
          expiresIn: '3h'
        })

        ctx.body = {
          code: 200,
          msg: '登录成功',
          bean: {
            token
          }
        }
      } else {
        ctx.body = PASSWORD_WRONG
      }
    } else {
      ctx.body = USER_NOT_EXIST
    }
  }

  // 刷新登录令牌
  static async freshToken(ctx) {
    const user = ctx.request.body
    const userToken = {
      userId: user.userId,
      userName: user.nickName
    }
    const token = jwt.sign(userToken, secret, {
      expiresIn: '3h'
    })

    ctx.body = {
      bean: {
        token
      }
    }
  }

  /**
   * 登出
   */
  static async getLogout(ctx) {
    const userId = ctx.params.userId
  }
  /**
   * 注册、创建用户
   */
  static async createUser(ctx) {
    const user = ctx.request.body

    if (user.identity && user.credential) {
      const existUser = await UserModel.getAuth(user)

      if (existUser) {
        ctx.body = USER_HAS_EXIST
      } else {
        // 密码加密
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(user.credential, salt)

        user.credential = hash
        user.nickName = user.nickName ? user.nickName : `user_${user.identity}`

        await UserModel.createUser(user)
        // 签发token
        const loginAuth = await UserModel.getAuth({
          identity: user.identity,
          userRole: user.userRole
        })
        const newUser = await UserModel.findUserById(loginAuth.userId)
        const userToken = {
          userId: newUser.userId,
          userName: newUser.nickName
        }
        const token = jwt.sign(userToken, secret, {
          expiresIn: '3h'
        })

        ctx.body = {
          code: 200,
          msg: '创建成功',
          bean: {
            token
          }
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '参数错误'
      }
    }
  }

  /**
   * 删除用户
   */
  static async deleteUser(ctx) {
    const userId = ctx.params.userId
    await UserModel.deleteUser(userId)
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  }
  /**
   * 修改用户信息
   */
  static async modifyUser(ctx) {
    const user = ctx.request.body
    await UserModel.modifyUser(user)
    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  }
  /**
   * 查询用户信息
   */
  static async findUserById(ctx) {
    const userId = ctx.params.userId

    const userInfo = await UserModel.findUserById(userId)

    ctx.body = {
      code: 200,
      msg: 'success',
      data: userInfo
    }
  }

  // 获取用户列表
  static async getUserList(ctx) {
    let {
      userRole,
      pageId,
      limit
    } = {
      ...ctx.query
      }
    pageId = pageId ? pageId : 1
    limit = limit > 20 ? 20 : limit
    const userList = await UserModel.getUserList(+userRole, +pageId, +limit)

    userList !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: userList.count,
      data: userList.rows
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }

  // ban
  static async getBanlist(ctx) {
    const status = ctx.query.status
    let pageId = ctx.query.pageId ? ctx.query.pageId : 1
    let limit = ctx.query.limit > 20 ? 20 : ctx.query.limit
    const data = await UserModel.getBanlist(+status, +pageId, +limit)

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: data.count,
      data: data.rows
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }
  // search
  static async searchUser(ctx) {
    const searchMsg = ctx.query.search

    const data = await UserModel.searchUser(searchMsg)

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: data
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }
}

export default UserController