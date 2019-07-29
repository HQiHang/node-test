const koa = require('koa');
const compose = require('koa-compose');
const app = new koa();

const first = async (ctx, next) => {
    ctx.body = 'aaa';
    await next();
};

const second = async ctx => {
    ctx.body = 'hello';
};

const middle = compose([first, second]);
app.use(middle);

app.listen(3003);