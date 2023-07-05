import path from 'path';
import Koa from 'koa';
import views from '@ladjs/koa-views';

const app = new Koa();

// setup views, appending .ejs
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

// dummy data

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// render

app.use(async function(ctx) {
  await ctx.render('user', { user });
});

if (module === require.main) {
  app.listen(3000);
}

export default app;
