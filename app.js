/*
 * @Author: sakura.zhang
 * @Date: 2018-03-19 19:42:12
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-10 16:55:52
 */
import Koa from 'koa'
import session from 'koa-session'
import redisStore from 'koa-redis'
import redis from 'redis'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import controller from './app/utils/controller'

const app = new Koa();
const client = redis.createClient(6379, '127.0.0.1')
const options = { client, db: 1 }
const store = redisStore(options)

app.keys = ['keys', 'keykeys']
app.use(session({
  store
}, app))

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text', 'html']
})) // 必须在router.routes()前面使用

app.use(logger())
app.use(controller())

app.listen(3000)
console.log('listen to 3000...')