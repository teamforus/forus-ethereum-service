/** Libs */
const bodyParser = require('body-parser')
const express = require('express')
const colors = require("colors");
const app = express();

/** Env file */
const env = require('./env.js');

/** Services */
const logger = require('./app/services/LogService');

// Support for JSON-encoded bodies
app.use(bodyParser.json());

// Support for URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

/** Routes */
app.use(require('./app/router'));

/** Node server configs */
const host = env.host || 'localhost'
const port = env.port || 8500;

app.listen(port, host, function() {
    logger.log('app', 'Node server started at port: ', port)
}).on('connection', function(socket) {
    logger.log('app', "- " + colors.green("A new connection was made by a client."));
    // 3000 second timeout.
    socket.setTimeout(3000 * 1000);
});
