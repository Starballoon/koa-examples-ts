// rather than koa apps we can also use array
// bundles of middleware to the same effect.

import {Context, Next} from 'koa';

async function responseTime(ctx: Context, next: Next) {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  ctx.set('X-Response-Time', ms + 'ms');
}

async function index(ctx: Context, next: Next) {
  await next();
  if ('/' != ctx.url) {
    return;
  }
  ctx.body = 'Howzit? From bar middleware bundle';
}

export default [
  responseTime,
  index
];
