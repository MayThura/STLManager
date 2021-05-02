const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const fs = require('fs');
const HttpStatus = require("http-status");


// const koaBody = require('koa-body');

const router = Router();

const app = new Koa();


// app.use(koaBody({
//   multipart: true,
//   formidable: {
//     maxFileSize: 200*1024*1024 // Set the maximum size of the uploaded file size, the default 2M
//   }
// }));

const PORT = process.env.PORT || 3001;

app.use(BodyParser());
app.use(Logger());
app.use(cors());


const router = new Router();


router.post('/upload', async (ctx, next) => {
    console.log(ctx);
    const file = ctx.request.body.files.file; // Get the uploaded file
    const reader = fs.createReadStream(file.path); // Create a readable stream
    const ext = file.name.split('.').pop(); // Get the upload file extension
    const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`); // Create a writable stream
    reader.pipe(upStream); // The readable stream writes a writable stream through the pipe
    // return ctx.body = 'Upload successful';
});

// router.post("/upload",async (ctx,next)=>{
//     const books = ["Speaking javascript", "Fluent Python", "Pro Python", "The Go programming language"];
//     ctx.status = HttpStatus.OK;
//     ctx.body = books;
//     await next();
// });

router.get("/", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    ctx.body = 'RICO HANDSOME';
    await next();
})

app.use(router.routes()).use(router.allowedMethods());


app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});