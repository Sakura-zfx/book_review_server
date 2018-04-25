/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-04-22 18:53:37
 */
import Router from 'koa-router'
import UserController from '../controllers/user'
import BookContorller from '../controllers/book'

const router = new Router({
  prefix: '/api'
})
// get=>查询 post=>新增 put=>更新 delete=>删除
router
  .post('/login', UserController.postLogin)
  .get('/logout/:userId', UserController.getLogout)
  .post('/register', UserController.createUser)
  .get('/user/:userId', UserController.findUserById) // 用户
  .post('/user', UserController.createUser)
  .put('/user', UserController.modifyUser)
  .delete('/user/:userId', UserController.deleteUser)
  .get('/book/search', BookContorller.findBooks) // 书籍
  .get('/book/:bookId', BookContorller.findBookById)
  .post('/book', BookContorller.createBook)
  .put('/book', BookContorller.modifyBook)
  .delete('/book/:bookId', BookContorller.deleteBook)
  .get('/cate', ) // 分类
  .post('/cate', )
  .put('/cate', )
  .delete('/cate/:cateId', )
  .get('/tag', ) // 标签
  .get('/book/:bookId/tag', )
  .post('/tag', )
  .put('/tag', )
  .delete('/tag/:tagId', )
  .get('/comment', ) // 评论
  .get('/book/:bookId/comment', )
  .get('/user/:userId/comment', )
  .post('/comment', )
  .delete('/comment/:commentId', )
  .get('/reply', ) // 回复
  .post('/reply', ) 
  .delete('/reply/:id', )
  .get('author', ) // 作者
  .post('/author', )
  .put('/author', )
  .delete('/author/:authorId', )
  .get('/score', ) // 评分
  .post('/score', ) 
  .put('/score', )
  .delete('/score', )
export default router