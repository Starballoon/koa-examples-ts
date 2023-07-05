/**
 * Multipart example downloading all the files to disk using co-busboy.
 * If all you want is to download the files to a temporary folder,
 * just use https://github.com/cojs/multipart instead of copying this code
 * as it handles file descriptor limits whereas this does not.
 */

import os from 'os';
import path from 'path';
import Koa from 'koa';
import fs from 'fs-extra';
import KoaBody from 'koa-body';
import {File} from 'formidable';

const app = new Koa();

app.use(KoaBody({multipart: true}));

app.use(async function(ctx) {
  // create a temporary folder to store files
  const tmpdir = path.join(os.tmpdir(), uid());

  // make the temporary directory
  await fs.mkdir(tmpdir, function() {});
  const filePaths = [];
  const files = ctx.request.files || {};

  for (let key in files) {
    const file = <File>files[key];
    const filePath = path.join(tmpdir, file.originalFilename || file.newFilename);
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
});

function uid() {
  return Math.random().toString(36).slice(2);
}

if (module === require.main) {
  app.listen(3000);
}

export default app;
