/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-16 01:58:34
 */
import Router from 'koa-router'
import UserController from '../controllers/user'

const router = new Router({
  prefix: '/api'
})

router
  .post('/login', UserController.postLogin)
  .post('/createUser')

export default router