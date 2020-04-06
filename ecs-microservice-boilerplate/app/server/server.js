const app = require('./app');
const router = require('./routes');
const db = require('./db.json');



const server = app.listen(3000);

module.exports = server;

console.log('Worker started');