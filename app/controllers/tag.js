import TagModel from '../models/tag'
import BookTagModel from '../models/book_tag'
import CateModel from '../models/cate'
import {
  FIND_WRONG,
  FIND_SUCCESS,
  ADD_SUCCESS,
  ADD_WRONG,
  DEL_SUCCESS,
  DEL_WRONG,
  MOD_SUCCESS,
  MOD_WRONG
} from '../../utils/constants';

class TagController {
  // 获取所有的tags
  static async getAllTags(ctx) {
    const data = await TagModel.findTags()
    // 获取分类名称
    for (let i in data) {
      const cateId = +data[i].cateId
      const cate = await CateModel.getCate(cateId)
      data[i].cateName = cate.cateName

      const tags = await TagModel.findTagsByCate(cateId)
      data[i].tags = tags
    }
    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: data
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  // 获取书籍下的tags
  static async getBookTags(ctx) {
    const bookId = ctx.params.bookId
    const data = await BookTagModel.getTagsByBook(+bookId)

    if (data.rows) {
      for (let i in data.rows) {
        const name = await TagModel.getTagName(+data.rows[i].tagId)
        data.rows[i].setDataValue('tagName', name.tagName)
      }
    }

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      bookId: bookId,
      count: data.count,
      data: data.rows
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  // 获取分类下的tags
  static async getCateTags(ctx) {
    const cateId = ctx.params.cateId

    const data = await TagModel.findTagsByCate(+cateId)

    // 获取每个tag下的书籍数量
    if (data) {
      for (let i in data) {
        const count = await BookTagModel.getBooksCount(+data[i].id)

        data[i].setDataValue('count', count)
      }
    }

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data: data
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  // add
  static async addTag(ctx) {
    const {
      tagName,
      cateId
    } = {
      ...ctx.request.body
    }

    if (!(tagName && cateId)) {
      ctx.body = {
        code: -90006,
        msg: '参数错误'
      }
    } else {

      const data = await TagModel.createTag({
        tagName,
        cateId: +cateId
      })

      data !== false ? ctx.body = {
        ...ADD_SUCCESS
      } : ctx.body = {
        ...ADD_WRONG
      }
    }
  }

  // delete
  static async deleteTag(ctx) {
    const tagId = ctx.params.tagId

    const data = await TagModel.deleteTag(tagId)

    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }

  // modify
  static async modifyTag(ctx) {
    const {
      tagId,
      tagName,
      cateId
    } = {
      ...ctx.request.body
    }

    const data = await TagModel.modifyTag({
      tagId,
      tagName,
      cateId
    })

    data !== false ? ctx.body = {
      ...MOD_SUCCESS
    } : ctx.body = {
      ...MOD_WRONG
    }
  }
}

export default TagController