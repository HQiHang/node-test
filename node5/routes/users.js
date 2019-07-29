const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', async (ctx, next) => {
  await  await ctx.render('layout', {
    title: 'Hello Hqh'
  })
})

module.exports = router
