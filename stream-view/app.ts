import Koa from 'koa';
import View from './view';
// import {Readable} from 'stream';

const app = new Koa();

app.use(async function(ctx) {
  ctx.type = 'html';
  const readable = ctx.body = new View();
  try {
    await readable.render();
  } catch (err: any) {
    ctx.onerror(err);
  }
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
