/*
 * @Author: sakura.zhang
 * @Date: 2018-03-19 19:42:12
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-05-04 03:06:55
 */
import Koa from 'koa'
import session from 'koa-session'
import redisStore from 'koa-redis'
import redis from 'redis'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import jwt from 'koa-jwt'
import {secret} from './config/secret'
import errorHandle from './app/middlewares/errorHandle'
import router from './app/api/index'
import path from 'path'
import staticResource from 'koa-static'
import historyApiFallback from 'koa-history-api-fallback'

const app = new Koa();
const client = redis.createClient(6379, '127.0.0.1')
const options = {
  client,
  db: 1
}
const store = redisStore(options)

app.keys = ['keys', 'keykeys']
app.use(session({
  store
}, app))

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text', 'html']
})) // 必须在router.routes()前面使用

// app.use(new CSRF({
//   invalidSessionSecretMessage: 'Invalid session secret',
//   invalidSessionSecretStatusCode: 403,
//   invalidTokenMessage: 'Invalid CSRF token',
//   invalidTokenStatusCode: 403,
//   excludedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
//   disableQuery: false
// }))

// 日志记录中间件
app.use(logger())

// koa-jwt错误处理中间件
app.use(errorHandle)

// koa-jwt中间件使用
app.use(jwt({
  secret,
}).unless({
  path: [/\/api\/register/, /\/api\/login/, /\/api\/user\/create/],
}))


app.use(router.routes())
app.use(router.allowedMethods())

app.use(historyApiFallback())
app.use(staticResource(path.resolve('dist')))

app.listen(3000)
console.log('listen to 3000...')