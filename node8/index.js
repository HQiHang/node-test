const koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
// const static = require('koa-static')
const path = require('path')
const app = new koa()
const router = new Router()

// app.use(static(path.join(__dirname, './static')))
app.use(views(path.join(__dirname + '/views'),{
    extension: 'ejs'
}))

app.use(router.routes(), router.allowedMethods())

router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'index',
        name: 'hqh'
    })
})

router.get('/users', async ctx => {
    await ctx.render('users', {
        title: 'users',
        name: 'hqh',
        age: 23
    })
})

app.listen(3001);