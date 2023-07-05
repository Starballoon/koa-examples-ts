/**
 * Module dependencies.
 */

import views from '@ladjs/koa-views';
import path from 'path';

// setup views mapping .html
// to the swig template engine

export default views(path.join(__dirname, '/../views'), {
  map: { html: 'swig' }
});
