import Koa from 'koa';
import KoaBody from 'koa-body';
import Session from 'koa-session';
import CSRF from 'koa-csrf';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

/**
 * csrf need session
 */

app.keys = ['session key', 'csrf example'];
app.use(Session(app));
app.use(KoaBody());

/**
 * maybe a bodyparser
 */

/**
 * csrf middleware
 */

app.use(new CSRF());

/**
 * route
 */

router
  .get('/token', token)
  .post('/post', post);

app.use(router.routes());

async function token(ctx: Koa.Context) {
  ctx.body = ctx.state._csrf;
}

async function post(ctx: Koa.Context) {
  ctx.body = {ok: true};
}

if (module === require.main) {
  app.listen(3000);
}

export default app;
