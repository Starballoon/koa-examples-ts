import Koa from 'koa';
import KoaBody from 'koa-body';

const app = new Koa();

app.use(KoaBody({
  jsonLimit: '1kb'
}));

// POST .name to /uppercase
// co-body accepts application/json
// and application/x-www-form-urlencoded

app.use(async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) {
    ctx.throw(400, '.name required');
  }
  ctx.body = { name: body.name.toUpperCase() };
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
