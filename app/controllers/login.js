/*
 * @Author: sakura.zhang
 * @Date: 2018-03-11 23:39:10
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-02 02:50:50
 */
// const { sequelize } = require('../../config/db')
import sequelize from '../../config/connect'
import Sequelize from 'sequelize'
import Auths from '../models/user_auths'
// 检验数据库连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const auths = new Auths(sequelize, Sequelize)
// User.sync({ force: true }).then(() => {
//   return User.create({
//     firstName: 'sakura',
//     lastName: 'zhang'
//   })
// })
let data = null;
auths.findAll().then(users => {
  data = users
  // console.log(users)
})

// 登录
const login = async (ctx, next) => {
  if (ctx.method === 'POST') {
    ctx.response.type = 'text/json'
    ctx.response.body = data
  } else {
    ctx.status = 400
    ctx.response.body = ctx.message
  }
  await next()
}

// 登出
const logout = async (ctx, next) => {
  ctx.response.type = 'text/html'
  ctx.response.body = 'logout'
  await next()
}

export {
  login,
  logout
}