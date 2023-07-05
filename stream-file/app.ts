import Koa from 'koa';
import fs from 'fs';
import path from 'path';

const app = new Koa();
const extname = path.extname;

// try GET /app.js

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path);
  const fstat = await stat(fpath);

  if (fstat.isFile()) {
    // a hack for MIME type mapping, because the MIME type to 'ts' is 'video/mp2t'
    const suffix = extname(fpath);
    ctx.type = suffix === '.ts' ? '.js' : suffix;
    ctx.body = fs.createReadStream(fpath);
  }
});

/**
 * thunkify stat
 */
function stat(file: fs.PathLike): Promise<fs.Stats> {
  return new Promise(function(resolve, reject) {
    fs.stat(file, function(err, stat) {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}

if (module === require.main) {
  app.listen(3000);
}

export default app;
