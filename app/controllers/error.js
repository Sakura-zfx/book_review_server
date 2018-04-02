const error = async (ctx, next) => {
  console.log(ctx)
  await next()
  if (ctx.status === 404) {
    ctx.response.type = 'text/html'
    ctx.response.status = 404
    ctx.response.body = 'not found'
  }
}

export {
  error
}