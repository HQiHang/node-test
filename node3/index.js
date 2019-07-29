const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const path = require('path');
const app = new Koa();
const router = new KoaRouter();
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

let gameArr = [
    { name: 'lol' },
    { name: 'FiFa' },
    { name: 'Nba' },
];
router.get('/', async ctx => {
    await ctx.render('index', {
        list: gameArr
    })
});

router.get('/add', async ctx => {
    await ctx.render('add')
});

router.post('/add', async ctx => {
    gameArr.push({ name: `${ctx.request.body.game}` });
    ctx.redirect('/');
});

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false
});


app.listen(8000);