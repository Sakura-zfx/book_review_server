/*
 * @Author: sakura.zhang
 * @Date: 2018-04-08 23:51:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-05-01 17:49:12
 */
// 自定义成功返回信息
export const LOGIN_SUCCESS = {
  code: 200,
  msg: '用户登录成功'
}

export const DEL_SUCCESS = {
  code: 200,
  msg: '删除成功'
}

export const MOD_SUCCESS = {
  code: 200,
  msg: '修改成功'
}

export const ADD_SUCCESS = {
  code: 200,
  msg: '新增成功'
}

export const FIND_SUCCESS = {
  code: 200,
  msg: '查询成功'
}
/** 
 * 自定义失败返回信息
 * {code: 200,msg: 'xxx'}
 */
export const PASSWORD_WRONG = '密码错误'
export const USER_NOT_EXIST = '该用户不存在'
export const USER_PERMISSION_ERROR = '用户权限错误'
export const USER_HAS_BEEN_BANNED = '您的账号已被封禁，请联系管理员'
export const USER_HAS_EXIST = '该用户已经存在'

export const LOGIN_WRONG = {
  code: -111,
  msg: '用户登录失败'
}

export const DEL_WRONG = {
  code: -111,
  msg: '删除失败'
}

export const MOD_WRONG = {
  code: -111,
  msg: '修改失败'
}

export const ADD_WRONG = {
  code: -111,
  msg: '新增失败'
}

export const FIND_WRONG = {
  code: -111,
  msg: '查询失败'
}