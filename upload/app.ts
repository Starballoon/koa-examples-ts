/**
 * Module dependencies.
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import Koa from 'koa';
import Logger from 'koa-logger';
import serve from 'koa-static';
import KoaBody from 'koa-body';
import {File} from 'formidable';

const app = new Koa();

// log requests

app.use(Logger());

app.use(KoaBody({multipart: true}));

// custom 404

app.use(async function(ctx, next) {
  await next();
  if (ctx.body || !ctx.idempotent) return;
  ctx.redirect('/404.html');
});

// serve files from ./public

app.use(serve(path.join(__dirname, '/public')));

// handle uploads

app.use(async function(ctx, next) {
  // ignore non-POSTs
  if ('POST' != ctx.method) {
    return await next();
  }

  const file = <File>ctx.request.files!.file;
  const reader = fs.createReadStream(file.filepath);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);
  if (process.env.NODE_ENV != 'test') {
    console.log('uploading %s -> %s', file.originalFilename, stream.path);
  }

  ctx.redirect('/');
});

// listen
if (module === require.main) {
  app.listen(3000);
}

console.log('listening on port 3000');

export default app;
