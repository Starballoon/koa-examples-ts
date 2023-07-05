import Koa from 'koa';

const app = new Koa();
app.use(async function(ctx) {
  ctx.body = 'Hello World';
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
