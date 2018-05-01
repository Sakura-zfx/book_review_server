import AuthorModel from '../models/author'
import {
  ADD_SUCCESS,
  ADD_WRONG,
  DEL_SUCCESS,
  DEL_WRONG,
  MOD_SUCCESS,
  MOD_WRONG,
  FIND_WRONG,
  FIND_SUCCESS
} from '../../utils/constants';

class AuthorController {
  static async createAuthor(ctx) {
    const {
      authorName,
      authorPic,
      authorGender,
      birth,
      country,
      authorIntro,
      authorWorks,
    } = {
      ...ctx.request.body
    }

    const data = await AuthorModel.createAuthor({
      authorName,
      authorPic,
      authorGender,
      birth,
      country,
      authorIntro,
      authorWorks,
    })

    data ? ctx.body = {
      ...ADD_SUCCESS
    } : ctx.body = {
      ...ADD_WRONG
    }
  }

  static async deleteAuthor(ctx) {
    const authorId = ctx.params.authorId

    const data = await AuthorModel.deleteAuthor(authorId)

    data ? ctx.body = {
      ...DEL_SUCCESS
    } : ctx.body = {
      ...DEL_WRONG
    }
  }

  static async modifyAuthor(ctx) {
    const {
      authorId,
      authorName,
      authorPic,
      authorGender,
      birth,
      country,
      authorIntro,
      authorWorks,
    } = {
      ...ctx.request.body  
      }
    
    const data = await AuthorModel.modifyAuthor({
      authorId,
      authorName,
      authorPic,
      authorGender,
      birth,
      country,
      authorIntro,
      authorWorks,
    })

    data ? ctx.body = {
      ...MOD_SUCCESS
    } : ctx.body = {
      ...MOD_WRONG
    }    
  }

  static async findAuthor(ctx) {
    const authorId = ctx.request.body.authorId
    const authorName = ctx.request.body.authorName

    const data = null
    if (authorId) {
      data = await AuthorModel.findAuthorById(authorId)
      ctx.body = {
        ...FIND_SUCCESS,
        data
      }
    } else if (authorName) {
      data = await AuthorModel.findAuthorByName(authorName)
      ctx.body = {
        ...FIND_SUCCESS,
        data
      }
    } else {
      ctx.body = {
        ...FIND_WRONG
      }
    }
  }
}

export default AuthorController