import BookModel from '../models/book'
import AuthorModel from '../models/author'
import InterestModel from '../models/interest'
import {
  FIND_WRONG,
  FIND_SUCCESS,
  MOD_SUCCESS,
  ADD_WRONG,
  ADD_SUCCESS,
  DEL_SUCCESS,
  DEL_WRONG,
  MOD_WRONG
} from '../../utils/constants';

class BookController {
  /**
   * 新增
   */
  static async createBook(ctx) {
    const book = ctx.request.body
    const authorList = ctx.request.body.authorList
    let str = ''

    if (typeof authorList === 'object') {
      for (let i in authorList) {
        str += `${JSON.stringify(authorList[i])}/`
      }
    } else {
      str = authorList
    }

    book.authorList = str
    // 增加书籍
    const data = await BookModel.createBook(book)

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG
    }
  }
  /**
   * 删除
   */
  static async deleteBook(ctx) {
    const bookId = ctx.params.bookId

    const data = await BookModel.deleteBook(+bookId)

    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }
  /**
   * 修改
   */
  static async modifyBook(ctx) {
    const book = ctx.request.body
    const authorList = ctx.request.body.authorList
    let str = ''
    if (typeof authorList === 'object') {
      for (let i in authorList) {
        str += `${JSON.stringify(authorList[i])}/`
      }
    } else {
      str = authorList
    }

    book.authorList = str

    const data = await BookModel.modifyBook(book)

    data !== false ? ctx.body = {
      ...MOD_SUCCESS
    } : ctx.body = {
      ...MOD_WRONG
    }
  }
  /**
   * 查询具体的单本书籍
   */
  static async findBookById(ctx) {
    const bookId = ctx.params.bookId

    // 书籍信息
    const book = await BookModel.findBookById(+bookId)
    // 获取评分信息
    const score = await InterestModel.getScoreByBook(+bookId)
    let total = 0,
      times = 0
    if (score) {
      for (let i in score) {
        if (+score[i].score !== 0) {
          total += (score[i].score * score[i].dataValues.count)
          times += (score[i].dataValues.count)
        } else {
          continue
        }
      }
    }
    const avg = (total === 0 || times === 0) ? 0 : (total / times).toFixed(2)
    book.setDataValue('score', score)
    book.setDataValue('reviewNumbers', times)
    book.setDataValue('avg', avg)
    // 作者信息
    const list = book.authorList ? book.authorList.split('/') : []
    let temp = []
    for (let i in list) {
      if (list[i]) {
        try {
          const value_json = JSON.parse(list[i])

          if (typeof value_json === 'object') {
            temp.push(value_json)
          } else if (typeof value_json === 'number') {
            temp.push(value_json)
          }
        } catch (e) {
          temp.push(list[i])
        }
      }
    }
    book.setDataValue('authorList', temp)
    book !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: book
    } : ctx.body = {
      ...FIND_WRONG
    }
  }
  // 获取最新图书
  static async getNewList(ctx) {
    let {
      pageId,
      limit
    } = { ...ctx.query
    }

    pageId = pageId ? +pageId : 1
    limit = limit ? +limit : 10
    const data = await BookModel.getNewList(pageId, limit)

    ctx.body = {
      ...FIND_SUCCESS,
      data: data
    }
  }
  // 获取最热图书
  static async getHotList(ctx) {
    let {
      pageId,
      limit
    } = { ...ctx.query
    }

    pageId = pageId ? +pageId : 1
    limit = limit ? +limit : 10
    const data = await InterestModel.getHotList(pageId, limit)
    const datalist = []
    // 获取书籍信息
    for (let i in data) {
      const bookId = +data[i].bookId

      const book = await BookModel.findBookById(+bookId)
      // 获取评分信息
      const score = await InterestModel.getScoreByBook(+bookId)
      let total = 0,
        times = 0
      if (score) {
        for (let i in score) {
          if (+score[i].score !== 0) {
            total += (score[i].score * score[i].dataValues.count)
            times += (score[i].dataValues.count)
          } else {
            continue
          }
        }
      }
      const avg = (total === 0 || times === 0) ? 0 : (total / times).toFixed(2)
      book.setDataValue('reviewNumbers', times)
      book.setDataValue('avg', avg)
      // 作者信息
      const list = book.authorList ? book.authorList.split('/') : []
      let temp = []
      for (let j in list) {
        if (list[j]) {
          try {
            const value_json = JSON.parse(list[j])

            if (typeof value_json === 'object') {
              temp.push(value_json)
            } else if (typeof value_json === 'number') {
              temp.push(value_json)
            }
          } catch (e) {
            temp.push(list[j])
          }
        }
      }
      book.setDataValue('authorList', temp)
      datalist.push(book)
    }
    ctx.body = {
      ...FIND_SUCCESS,
      data: datalist
    }
  }

  // 获取评分图书
  static async getHighScoreList(ctx) {
    let {
      pageId,
      limit
    } = { ...ctx.query
    }

    pageId = pageId ? +pageId : 1
    limit = limit ? +limit : 10
    const data = await InterestModel.getHighScoreList(pageId, limit)
    const datalist = []
    // 获取书籍信息
    for (let i in data) {
      const bookId = +data[i].bookId

      const book = await BookModel.findBookById(+bookId)
      // 获取评分信息
      const score = await InterestModel.getScoreByBook(+bookId)
      let total = 0,
        times = 0
      if (score) {
        for (let i in score) {
          if (+score[i].score !== 0) {
            total += (score[i].score * score[i].dataValues.count)
            times += (score[i].dataValues.count)
          } else {
            continue
          }
        }
      }
      const avg = (total === 0 || times === 0) ? 0 : (total / times).toFixed(2)
      book.setDataValue('reviewNumbers', times)
      book.setDataValue('avg', avg)
      // 作者信息
      const list = book.authorList ? book.authorList.split('/') : []
      let temp = []
      for (let j in list) {
        if (list[j]) {
          try {
            const value_json = JSON.parse(list[j])

            if (typeof value_json === 'object') {
              temp.push(value_json)
            } else if (typeof value_json === 'number') {
              temp.push(value_json)
            }
          } catch (e) {
            temp.push(list[j])
          }
        }
      }
      book.setDataValue('authorList', temp)
      datalist.push(book)
    }
    ctx.body = {
      ...FIND_SUCCESS,
      data: datalist
    }
  }
  /**
   * 查询书籍数组
   */
  static async findBooks(ctx) {
    let {
      searchMsg,
      pageId,
      limit
    } = { ...ctx.query
    }

    pageId = pageId ? +pageId : 1
    limit = limit ? limit > 30 ? 30 : +limit : 10

    let books = null
    if (searchMsg) {
      books = await BookModel.findBookBySearch(searchMsg, pageId, limit)
    } else {
      ctx.body = {
        code: -90006,
        msg: '参数错误，没有查询条件'
      }
    }

    // 每本书的信息
    for (let i in books.rows) {
      // 作者信息
      const list = books.rows[i].authorList ? books.rows[i].authorList.split('/') : []

      let temp = []
      for (let j in list) {
        if (list[j]) {
          try {
            const value_json = JSON.parse(list[j])

            if (typeof value_json === 'object') {
              temp.push(value_json)
            } else if (typeof value_json === 'number') {
              temp.push(value_json)
            }
          } catch (e) {
            temp.push(list[j])
          }
        }
      }
      books.rows[i].setDataValue('authorList', temp)

      // 获取评分信息
      const score = await InterestModel.getScoreByBook(+books.rows[i].bookId)
      let total = 0,
        times = 0
      if (score) {
        for (let i in score) {
          if (+score[i].score !== 0) {
            total += (score[i].score * score[i].dataValues.count)
            times += (score[i].dataValues.count)
          } else {
            continue
          }
        }
      }
      const avg = (total === 0 || times === 0) ? 0 : (total / times).toFixed(2)
      books.rows[i].setDataValue('score', score)
      books.rows[i].setDataValue('reviewNumbers', times)
      books.rows[i].setDataValue('avg', avg)
    }

    books !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: books.count,
      data: books.rows
    } : ctx.body = {
      ...FIND_WRONG
    }
  }
}

export default BookController