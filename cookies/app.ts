/**
 * This example simply sets the number of views from the same client
 * both as a cookie and as a response string.
 */

import Koa from 'koa';
const app = new Koa();

app.use(async function(ctx) {
  const n = parseInt(ctx.cookies.get('view') || '0') + 1;
  ctx.cookies.set('view', n.toString());
  ctx.body = n + ' views';
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
