import CollectionModel from '../models/collection'
import {
  FIND_SUCCESS,
  FIND_WRONG,
  ADD_SUCCESS,
  ADD_WRONG,
  DEL_SUCCESS,
  DEL_WRONG,
  MOD_WRONG,
  MOD_SUCCESS
} from '../../utils/constants';

class CollectionController {
  static async getCollectionsByUser(ctx) {
    const userId = ctx.params.userId

    const data = await CollectionModel.getCollectionByUser(userId)

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: data.count,
      data: data.rows
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  static async getCountByBook(ctx) {
    const bookId = ctx.params.bookId

    const count = await CollectionModel.getCountByBook(bookId)

    count !== false ? ctx.body = {
      ...FIND_SUCCESS,
      count: count
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  static async getStatus(ctx) {
    const bookId = ctx.params.bookId
    const userId = ctx.params.userId

    const data = await CollectionModel.getStatus({
      bookId,
      userId
    })

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data
    } : ctx.body = {
      ...FIND_WRONG
    }
  }

  static async addCollection(ctx) {
    const {
      bookId,
      userId,
      status,
      collectionTime
    } = {
      ...ctx.request.body
    }

    const data = await CollectionModel.addCollection({
      bookId,
      userId,
      status,
      collectionTime
    })

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG
    }
  }

  static async modifyStatus(ctx) {
    const {
      id,
      status
    } = {
      ...ctx.request.body
    }

    const data = await CollectionModel.modifyCollectionStatus(id, status)

    data !== false ? ctx.body = {
      ...MOD_SUCCESS
    } : ctx.body = {
      ...MOD_WRONG
    }
  }

  static async cancelCollection(ctx) {
    const id = ctx.params.id

    const data = await CollectionModel.cancelCollection(id)

    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }
}

export default CollectionController