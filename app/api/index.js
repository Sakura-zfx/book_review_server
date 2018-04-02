/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-02 02:47:28
 */
// const {login, logout} = require('../controllers/login')
import { login, logout} from '../controllers/login'
import { error} from '../controllers/error'

export default [
  {
    method: 'get',
    uri: '*',
    fn: error
  },
  {
    method: 'post',
    uri: '/api/login',
    fn: login,
  },
  {
    method: 'get',
    uri: '/api/login',
    fn: login,
  },
  {
    method: 'get',
    uri: '/api/logout',
    fn: logout
  }
]