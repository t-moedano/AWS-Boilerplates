const router = require('koa-router')();
const db = require('./db.json');

router.get('/api/posts/in-thread/:threadId', function* () {
    const id = parseInt(this.params.threadId);
    this.body = db.posts.filter((post) => post.thread == id);
});

router.get('/api/posts', function* () {
    this.body = db.posts;
});

router.get('/api/posts/by-user/:userId', function* () {
    const id = parseInt(this.params.userId);
    this.body = db.posts.filter((post) => post.user == id);
});

router.get('/api/', function* () {
    this.body = "API ready to receive requests";
});

router.get('/', function* () {
    this.body = "Ready to receive requests";
});

module.exports = router;