import userMode from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import UserModel from '../models/user';
import {
  PASSWORD_WRONG,
  USER_NOT_EXIST,
  USER_PERMISSION_ERROR,
  USER_HAS_BEEN_BANNED,
  USER_HAS_EXIST
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
        const token = jwt.sign(userToken, 'jwt_koa_secret', { expiresIn: '3h' })
        
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

        ctx.body = {
          code: 200,
          msg: '创建成功'
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

    cxt.body = {
      code: 200,
      msg: 'success',
      data: userInfo
    }
  }
}

export default UserController