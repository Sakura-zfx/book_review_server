/*
 * @Author: sakura.zhang
 * @Date: 2018-03-19 19:42:12
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-06-04 00:15:02
 */
import Koa from 'koa'
import session from 'koa-session'
import redisStore from 'koa-redis'
import redis from 'redis'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import jwt from 'koa-jwt'
import {
  secret
} from './config/secret'
import errorHandle from './app/middlewares/errorHandle'
import router from './app/api/index'
import multer from 'koa-multer'
import path from 'path'
import staticResource from 'koa-static'
import historyApiFallback from 'koa-history-api-fallback'

const app = new Koa();
const storage = multer.diskStorage({
  //文件保存路径  
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称  
  filename: function (req, file, cb) {
    const mark = req.url.split('?')[1].split('=')[1]
    var fileFormat = (file.originalname).split(".");
    cb(null, mark + "_" + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置  
const upload = multer({
  storage: storage
});
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename //返回文件名
  }
})

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

const myFilter = (ctx) => {
  const url = ctx.req.url
  const method = ctx.req.method
  if (url === '/api/login' || url === '/api/register' || url.indexOf('uploads' >= 0)) {
    return true
  }
  if (method.toLowerCase() === 'get') {
    if (url === 'author' || url.indexOf('book') >= 0 || url.indexOf('comment') >= 0 || url.indexOf('tag') >= 0 || url.indexOf('reply') >= 0 || /\/api\/user\/\d{1,}/.test(url)) {
      return true
    }
  }
}
// koa-jwt中间件使用
app.use(jwt({
  secret,
}).unless(myFilter))


app.use(router.routes())
app.use(router.allowedMethods())

app.use(historyApiFallback())
app.use(staticResource(__dirname + '/public'))

app.listen(3000)
console.log('listen to 3000...')