/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-16 11:47:38
 */
import Router from 'koa-router'
import UserController from '../controllers/user'

const router = new Router({
  prefix: '/api'
})

router
  .post('/login', UserController.postLogin)
  .get('/logout/:userId', UserController.getLogout)
  .post('/register', UserController.createUser)
  .get('/user/:userId', UserController.findUserById)
  .post('/user', UserController.createUser)
  .put('/user', UserController.modifyUser)
  .delete('/user/:userId', UserController.deleteUser)

export default router