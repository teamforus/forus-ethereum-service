var colors = require("colors");
var solc = require('solc');
var path = require('path');
var fs = require('fs');

let web3 = require('./web3.js');

let balanceService = new require('../services/balanceService.js')(web3);
let accountsService = new require('../services/accountsService.js')(web3);

let logger = require('./logger.js');

let getBalance = function(targetAddress) {
    return new Promise(function(resolve, reject) {
        balanceService.getBalance(targetAddress).then(function(balance) {
            logger.log("\tAccount's balance: " + colors.green(balance + " coin(s)"));
            resolve(balance);
        }, reject);
    });
};

let topUpAddress = function(targetAddress, ether) {
    return new Promise(function(resolve, reject) {
        accountsService.topUpAddress(targetAddress, ether).then(function(block) {
            logger.log("\tThe transaction block number: ", colors.green(block.blockNumber));
            resolve(block);
        }, reject);
    });
};


let transferEther = function(addressFrom, privateFrom, addressTo, ether) {
    return new Promise(function(resolve, reject) {
        accountsService.transferEther(addressFrom, privateFrom, addressTo, ether).then(function(block) {
            logger.log("\tThe transaction block number: ", colors.green(block.blockNumber));
            resolve(block);
        }, reject);
    });
};

let getAccounts = function() {
    return new Promise(function(resolve, reject) {
        accountsService.getAccounts().then(function(accounts) {
            logger.log("\tAccounts: ", colors.green(accounts));
            resolve(accounts);
        }, reject);
    });
};

let newAccount = function(password, tokens) {
    return new Promise(function(resolve, reject) {
        accountsService.newAccount(password, tokens).then(function(address) {
            logger.log(
                "\tNew account created:",
                "\n\t\tpublic: " + colors.green(address) +
                "\n\t\tprivate: " + colors.green(password));
            resolve(address);
        }, reject);
    });
};

let importWallet = function(passphrase) {
    return new Promise(function(resolve, reject) {
        accountsService.importWallet(passphrase).then(function(address) {
            logger.log(
                "\tNew account created:",
                "\n\t\tpublic: " + colors.green(address) +
                "\n\t\tprivate: " + colors.green(passphrase));
            resolve(address);
        }, reject);
    });
};

module.exports = {
    getBalance: getBalance,
    topUpAddress: topUpAddress,
    transferEther: transferEther,
    importWallet: importWallet,
    newAccount: newAccount,
    getAccounts: getAccounts,
    web3: web3,
    services: {
        balanceService: balanceService,
        accountsService: accountsService
    }
};