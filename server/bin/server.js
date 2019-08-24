var bodyParser = require('body-parser')
var express = require('express')
var colors = require("colors");
var fs = require("fs");
var app = express()

let logger = require('../core/logger.js');

var core = require('../core/core.js');
var sponsor = require('../storage/sponsor.json') || {};

var env = require('../../.env.js');

var host = env.host || 'localhost'
var port = env.port || 8500;

let apiKey = env.api_key;
let allowedIp = env.allowed_ip;

if (typeof allowedIp == 'string')
    allowedIp = [allowedIp];

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

let logEndpoint = function(req, res, next) {
    logger.log("Endpoint reached:", colors.green(req.route.path));
    next();
};

app.use(function(req, res, next) {
    if (req.get('Api-Key') != apiKey) {
        return res.status(401).send({
            "error": "access-forbiden",
            "message": "Access forbiden!",
        });
    }

    if (allowedIp.indexOf("*") == -1) {
        if (allowedIp.indexOf(req.ip) == -1) {
            return res.status(401).send({
                "error": "access-forbiden",
                "message": "Access forbiden!",
            });
        }
    }
    
    next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', logEndpoint, function(req, res) {
    res.send({
        status: 'Up and Running.'
    });
});

app.post('/api/import-wallet', logEndpoint, function(req, res) {
    let wallet = req.body.wallet;

    logger.log('Import wallet');
    core.importWallet(wallet.passphrase).then(function(block) {
        res.send({
            block: block
        });
    }, function(data) {
        logger.log(arguments);
        
        res.status(500).send({
            "message": arguments,
        });
    });
});

app.post('/api/transfer-ether', logEndpoint, function(req, res) {
    let addressFrom = req.body.from.address;
    let privareFrom = req.body.from.private;
    let addressTo = req.body.to.address;
    let amount = parseInt(req.body.amount);

    logger.log('Transfer ether from ' + addressFrom + ' to ' + addressTo + '(' + amount + 'eth.)');

    account = core.transferEther(addressFrom, privareFrom, addressTo, amount);
    account.then(function(block) {
        res.send({
            block: block
        });
    }, function(data) {
        logger.log(arguments);
        
        res.status(500).send({
            "message": arguments,
        });
    });
});

app.post('/api/top-up', logEndpoint, function(req, res) {
    let addressTo = req.body.to.address;
    let amount = parseInt(req.body.amount);

    logger.log('Top up account ' + addressTo + '(' + amount + 'eth.)');

    account = core.topUpAddress(addressTo, amount);
    account.then(function(block) {
        res.send({
            block: block
        });
    }, function(data) {
        logger.log(arguments);

        res.status(500).send({
            "message": arguments,
        });
    });
});

app.get('/api/account/:address/balance', logEndpoint, function(req, res) {
    let address = req.params.address;

    core.getBalance(address).then(function(balance) {
        res.send({
            balance: balance / 1
        });
    }, function(data) {
        logger.log(arguments);
        
        res.status(500).send({
            "message": arguments,
        });
    });
});

app.get('/api/account/all', logEndpoint, function(req, res) {
    core.getAccounts().then(function(account) {
        res.send({
            accounts: account
        });
    }, function(data) {
        logger.log(arguments);

        res.status(500).send({
            "message": arguments,
        });
    });
});

app.listen(port, host, function() {
    logger.log('Node server started at port: ', port)
}).on('connection', function(socket) {
    logger.log("- " + colors.green("A new connection was made by a client."));
    // 3000 second timeout.
    socket.setTimeout(3000 * 1000);
});
