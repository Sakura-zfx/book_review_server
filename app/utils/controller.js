/*
 * @Author: sakura.zhang 
 * @Date: 2018-03-11 23:39:16 
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-02 01:39:47
 */
import Router from 'koa-router'
import routesList from '../api/index'

const router = new Router()

const addRoutes = function () {
  for (let route of routesList) {
    switch (route.method) {
      case 'post':
        router.post(route.uri, route.fn)
        console.log(`Register post url: ${route.uri}`)
        break
      case 'get':
        router.get(route.uri, route.fn)
        console.log(`Register get url: ${route.uri}`)
        break
      case 'put':
        router.put(route.uri, route.fn)
        console.log(`Register put url: ${route.uri}`)
        break
      case 'delete':
        router.delete(route.uri, route.fn)
        console.log(`Register del url: ${route.uri}`)
        break
      default:
        console.log(`Invalid url: ${route}`)
    }
  }
}

export default () => { 
  addRoutes()
  return router.routes()
}