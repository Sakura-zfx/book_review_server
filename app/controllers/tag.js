import TagModel from '../models/tag'
import { FIND_WRONG, FIND_SUCCESS, ADD_SUCCESS, ADD_WRONG, DEL_SUCCESS, DEL_WRONG, MOD_SUCCESS, MOD_WRONG } from '../../utils/constants';

class TagController {
  // 获取所有的tags
  static async getAllTags(ctx) {
    const data = await TagModel.findTags()

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
    const data = await TagModel.findTagsByBook(bookId)

    if (data) {
      data.forEach(async (item) => {
        const name = await TagModel.getTagName(item.tagId)
        item.tagName = name
      })
    }

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      bookId: bookId,
      data: data
    } : ctx.body = {
      ...FIND_WRONG  
    }
  }

  // 获取分类下的tags
  static async getCateTags(ctx) {
    const cateId = ctx.params.cateId

    const data = await TagModel.findTagsByCate(cateId)

    // 获取每个tag下的书籍数量
    if (data) {
      data.forEach(async (item) => {
        const count = await TagModel.getBookCount(tagId)

        item.count = count
      })
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
    
    const data = await TagModel.createTag({
      tagName,
      cateId
    })

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG  
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