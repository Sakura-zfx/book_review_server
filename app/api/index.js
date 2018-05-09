/*
 * @Author: sakura.zhang
 * @Date: 2018-03-12 00:14:59
 * @Last Modified by: sakura.zhang
 * @Last Modified time: 2018-05-08 17:08:30
 */
import Router from 'koa-router'
import AuthorController from '../controllers/author'
import BookContorller from '../controllers/book'
import CateController from '../controllers/cate'
import CollectionController from '../controllers/collection'
import UserController from '../controllers/user'
import CommentController from '../controllers/comment';
import ReplyController from '../controllers/reply';
import TagController from '../controllers/tag';

const router = new Router({
  prefix: '/api'
})
// get=>查询 post=>新增 put=>更新 delete=>删除
router
  .post('/login', UserController.postLogin)
  .get('/logout/:userId', UserController.getLogout)
  .post('/register', UserController.createUser)

  .get('/user/list', UserController.getUserList)
  .get('/user/search', UserController.searchUser)
  .get('/user/banlist', UserController.getBanlist)
  .get('/user/:userId', UserController.findUserById) // 用户
  .post('/user/create', UserController.createUser)
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
  .delete('/book/collection/:id', CollectionController.cancelCollection)

  // .get('/book/user/:userId/recommendation', ) // 书籍推荐

  .get('/cate', CateController.findCates) // 分类
  .post('/cate', CateController.createCate)
  .put('/cate', CateController.modifyCate)
  .delete('/cate/:cateId', CateController.deleteCate)

  .get('/tag', TagController.getAllTags) // 标签
  .get('/book/:bookId/tag', TagController.getBookTags)
  .get('/cate/:cateId/tag', TagController.getCateTags)
  .post('/tag', TagController.addTag)
  .put('/tag', TagController.modifyTag)
  .delete('/tag/:tagId', TagController.deleteTag)

  .get('/book/:bookId/comment', CommentController.getBookComments) // 评论
  .get('/user/:userId/comment', CommentController.getUserComments)
  .post('/comment', CommentController.createComment)
  .delete('/comment/:commentId', CommentController.deleteComment)

  .get('/comment/:commentId/reply', ReplyController.findRepliesByComment) // 回复
  .get('/comment/:commentId/:replyId/reply', ReplyController.findRepliesByComment_r)
  .post('/reply', ReplyController.addReply) 
  .delete('/reply/:id', ReplyController.deleteReply)
  
  .get('author', AuthorController.findAuthor) // 作者
  .post('/author', AuthorController.createAuthor)
  .put('/author', AuthorController.modifyAuthor)
  .delete('/author/:authorId', AuthorController.deleteAuthor)
export default router