/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-10 17:03:25
 */
// const {login, logout} = require('../controllers/login')
import { login, logout} from '../controllers/login'

export default [
  {
    method: 'post',
    uri: '/api/login',
    needAuth: false,
    fn: login,
  },
  {
    method: 'get',
    uri: '/api/logout/:id',
    needAuth: false,
    fn: logout,
  }
]