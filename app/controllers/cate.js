import CateModel from '../models/cate'
import {
  ADD_SUCCESS,
  ADD_WRONG,
  DEL_SUCCESS,
  DEL_WRONG,
  MOD_SUCCESS,
  MOD_WRONG,
  FIND_SUCCESS,
  FIND_WRONG
} from '../../utils/constants';

class CateController {
  static async createCate(ctx) {
    const {
      cateName
    } = {
      ...ctx.request.body
    }
    console.log(ctx.request.body)
    const data = await CateModel.createCate({
      cateName
    })

    data !== false ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG
    }
  }

  static async deleteCate(ctx) {
    const cateId = ctx.params.cateId

    const data = await CateModel.deleteCate(cateId)

    data !== false ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }

  static async modifyCate(ctx) {
    const {
      cateId,
      cateName
    } = {
      ...ctx.request.body
    }

    const data = await CateModel.modifyCate({
      cateId,
      cateName
    })

    data !== false ? ctx.body = {
      ...MOD_SUCCESS
    } : ctx.body = {
      ...MOD_WRONG
    }
  }

  static async findCates(ctx) {
    const data = await CateModel.findCates()

    data !== false ? ctx.body = {
      ...FIND_SUCCESS,
      data
    } : ctx.body = {
      ...FIND_WRONG
    }
  }
}

export default CateController