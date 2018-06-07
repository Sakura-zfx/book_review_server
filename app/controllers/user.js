import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import {
  secret
} from '../../config/secret'
import UserModel from '../models/user';
import BookModel from '../models/book'
import CommentModel from '../models/comment'
import TagModel from '../models/tag'
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
  // 首页展示信息
  static async getNum(ctx) {
    const userNum = await UserModel.getNumU()
    const coNum = await CommentModel.getNumB_c(2)
    const bookNum = await BookModel.getNumB()
    const tagNum = await TagModel.getNumT()

    ctx.body = {
      code: 200,
      data: {
        book: bookNum,
        user: userNum,
        comment: coNum,
        tag: tagNum
      }
    }
  }
  /**
   * 登录
   */
  static async postLogin(ctx) {
    const loginMsg = ctx.request.body
    const loginAuth = await UserModel.getAuth(loginMsg)
    if (loginAuth) {
      if (+loginAuth.status === 1) {
        ctx.body = USER_HAS_BEEN_BANNED
      }
      else if (bcrypt.compareSync(loginMsg.credential, loginAuth.credential)) {
        const user = await UserModel.findUserById(loginAuth.userId)
        const userToken = {
          userId: user.userId,
          userName: user.nickName
        }
        const token = jwt.sign(userToken, secret, {
          expiresIn: '7d'
        })

        // 刷新登录时间
        await UserModel.modifyAuth({
          loginTime: new Date()
        }, {
          userId: +user.userId
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
      expiresIn: '7d'
    })

    ctx.body = {
      bean: {
        token
      }
    }
  }

  // 获取验证码
  static async getAuthCode(ctx) {
    const identity = ctx.query.identity

    // 生成验证码，通过identity限制用户的请求次数

    // 保存验证码

    ctx.body = {
      code: 200,
      authCode: '937546'
    }
  }

  // 密码重置
  static async resetPassword(ctx) {
    const userId = ctx.request.body.userId
    let credential = ctx.request.body.credential
    const authCode = ctx.request.body.authCode

    // 密码加密
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(credential, salt)

    credential = hash

    await UserModel.modifyAuth({ credential: credential }, { userId: +userId })
    
    ctx.body = {
      code: 200,
      msg: '重置密码成功'
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
          msg: '创建成功',
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
    const {
      userId,
      nickName,
      picture,
      userGender,
      trueName,
      birth,
      address,
      presentation,
      userRole,
      status,
      email,
      phone
    } = { ...ctx.request.body
    }
    await UserModel.modifyUser({
      userId,
      nickName,
      picture,
      userGender,
      trueName,
      birth: birth ? birth : null,
      address,
      presentation,
    })
    await UserModel.modifyAuth({ 
      status: +status,
      userRole: +userRole === 2 ? 2 : 1
     }, {
      userId: +userId
    })
    email && await UserModel.modifyAuth({
      identity: email
    }, {
        userId: +userId,
        identityType: 'email',        
      })
    phone && await UserModel.modifyAuth({
      identity: phone
    }, {
        userId: +userId,
      identityType: 'phone'  
    })
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

    const userInfo = await UserModel.findUserById(+userId)

    ctx.body = {
      code: 200,
      msg: 'success',
      data: userInfo
    }
  }

  // 查询（非本人以及管理员）
  static async findUserByOther(ctx) {
    const userId = ctx.params.userId

    const userInfo = await UserModel.findUserByOther(+userId)

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
    limit = limit ? limit > 30 ? 30 : limit : 10
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
  static async verifyUser(ctx) {
    const identity = ctx.query.identity

    const data = await UserModel.verifyUser(identity)
    data ? ctx.body = {
      ...USER_HAS_EXIST,
      userId: data.userId,
      phone: data.dataValues.phone
    } : ctx.body = {
        code: 200,
        msg: '可以新增'  
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