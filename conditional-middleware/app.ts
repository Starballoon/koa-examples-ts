import Koa from 'koa';
import Logger from 'koa-logger';

const app = new Koa();

// passing any middleware to this middleware
// will make it conditional, and will not be used
// when an asset is requested, illustrating how
// middleware may "wrap" other middleware.

function ignoreAssets(mw: Koa.Middleware) {
  return async function(this: any, ctx: Koa.Context, next: Koa.Next) {
    if (/(\.js|\.css|\.ico)$/.test(ctx.path)) {
      await next();
    } else {
      // must .call() to explicitly set the receiver
      await mw.call(this, ctx, next);
    }
  };
}

// TRY:
// $ curl http://localhost:3000/
// $ curl http://localhost:3000/style.css
// $ curl http://localhost:3000/some.html

app.use(ignoreAssets(Logger()));

app.use(async function(ctx) {
  ctx.body = 'Hello World';
});

app.listen(3000);
