import Koa from 'koa';
import Logger from 'koa-logger';
import Router from 'koa-router';
import KoaBody from 'koa-body';
import render from './lib/render';

const app = new Koa();
const router = new Router();

// "database"

const posts: any[] = [];

/**
 * Post listing.
 */

async function list(ctx: Koa.Context) {
  await ctx.render('list', { posts: posts });
}

/**
 * Show creation form.
 */

async function add(ctx: Koa.Context) {
  await ctx.render('new');
}

/**
 * Show post :id.
 */

async function show(ctx: Koa.Context) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) {
    ctx.throw(404, 'invalid post id');
  }
  await ctx.render('show', { post: post });
}

/**
 * Create a post.
 */

async function create(ctx: Koa.Context) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

// middleware

app.use(Logger());

app.use(render);

app.use(KoaBody());

// route definitions

router
  .get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

if (module === require.main) {
  app.listen(3000);
}

export default app;
