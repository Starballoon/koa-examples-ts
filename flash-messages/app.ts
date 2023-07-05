/**
 * A very simple flash example.
 * Only uses JSON for simplicity.
 */

import Koa from 'koa';
import RawBody from 'raw-body';
import session from 'koa-session';

const app = new Koa();

// required for signed cookie sessions
app.keys = ['key1', 'key2'];
app.use(session(app));

app.use(async function(ctx, next) {
  if (ctx.method !== 'GET' || ctx.path !== '/messages') {
    return await next();
  }

  // get any messages saved in the session
  ctx.body = ctx.session!.messages || [];

  // delete the messages as they've been delivered
  delete ctx.session!.messages;
});

app.use(async function(ctx, next) {
  if (ctx.method !== 'POST' || ctx.path !== '/messages') {
    return await next();
  }

  // the request string is the flash message
  const message = await RawBody(ctx.req, {
    encoding: 'utf8'
  });

  // push the message to the session
  ctx.session!.messages = ctx.session!.messages || [];
  ctx.session!.messages.push(message);

  // tell the client everything went okay
  ctx.status = 204;
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
