/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-05-02 02:02:11
 */
import Router from 'koa-router'
import AuthorController from '../controllers/author'
import BookContorller from '../controllers/book'
import CateController from '../controllers/cate'
import CollectionController from '../controllers/collection'
import UserController from '../controllers/user'

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

  .get('/book/user/:userId/collection', CollectionController.getCollectionsByUser) // 书籍收藏
  .get('/book/:bookId/collection', CollectionController.getCountByBook)
  .get('/book/:bookId/user/:userId/collection', CollectionController.getStatus)
  .post('/book/collection', CollectionController.addCollection)
  .put('/book/collection', CollectionController.modifyStatus)
  .delte('/book/collection/:id', CollectionController.cancelCollection)

  .get('/book/user/:userId/recommendation', ) // 书籍推荐

  .get('/cate', CateController.findCates) // 分类
  .post('/cate', CateController.createCate)
  .put('/cate', CateController.modifyCate)
  .delete('/cate/:cateId', CateController.deleteCate)

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
  
  .get('author', AuthorController.findAuthor) // 作者
  .post('/author', AuthorController.createAuthor)
  .put('/author', AuthorController.modifyAuthor)
  .delete('/author/:authorId', AuthorController.deleteAuthor)
export default router