/**
 * Each `app.use()` only accepts a single generator function.
 * If you want to combine multiple generator functions into a single one,
 * you can use `koa-compose` to do so.
 * This allows you to use `app.use()` only once.
 * Your code will end up looking something like:
 *
 *   app.use(compose([
 *     function *(){},
 *     function *(){},
 *     function *(){}
 *   ]))
 */

import Koa from 'koa';
import compose from 'koa-compose';

const app = new Koa();

// x-response-time

async function responseTime(ctx: Koa.Context, next: Koa.Next) {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  ctx.set('X-Response-Time', ms + 'ms');
}

// logger

async function logger(ctx: Koa.Context, next: Koa.Next) {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  if ('test' != process.env.NODE_ENV) {
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
  }
}

// response

async function respond(ctx: Koa.Context, next: Koa.Next) {
  await next();
  if ('/' === ctx.url) {
    ctx.body = 'Hello World';
  }
}

// composed middleware

const all = compose([
  responseTime,
  logger,
  respond
]);

app.use(all);

if (module === require.main) {
  app.listen(3000);
}

export default app;
