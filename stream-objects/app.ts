import Koa from 'koa';
import JSONStream from 'streaming-json-stringify';

const app = new Koa();

app.use(async function(ctx) {
  ctx.type = 'json';
  const stream = ctx.body = JSONStream();

  stream.on('error', ctx.onerror);

  setImmediate(function() {
    stream.write({
      id: 1
    });

    setImmediate(function() {
      stream.write({
        id: 2
      });

      setImmediate(function() {
        stream.end();
      });
    });
  });
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
