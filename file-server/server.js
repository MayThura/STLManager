const koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const send = require('koa-send');
const path = require('path');

const app = new koa();

const router = new Router();

const dataPathArr = __dirname.split('/');

const dataPath = `${dataPathArr.slice(0, dataPathArr.length - 1).join('/')}/stl-viewer/public`;

app.use(cors());

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: dataPath,
    keepExtensions: true,
  },
  urlencoded: true,
}));

router.post('/upload', async (ctx) => {
  ctx.body = ctx.request.files.myFile.path;
  return ctx;
});

router.get('/download/:name', async (ctx) => {
  const name = ctx.params.name;
  const filePath = `${dataPath}/${name}`;
  ctx.attachment(filePath);
  ctx.response.status = 200;
  console.log(process.env.HOME);
  await send(ctx, name, { root: dataPath });
});

app.use(router.routes());

app.listen(3001, () => {
  console.log('KOA server is listening in 3001');
})
