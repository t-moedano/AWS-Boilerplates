const app = require('koa')();
const router = require('./routes');

// Log requests
app.use(function* (next) {
    const start = new Date;
    yield next;
    const ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Worker started');

module.exports = app;