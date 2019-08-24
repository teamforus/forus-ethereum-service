var sponsor = require('../storage/sponsor.json') || false;

let AccountsService = function(web3) {
    var self = this;

    self.checkTransaction = function(hash, callback) {
        web3.eth.getTransaction(hash, function(err, block) {
            if (!block || block.blockNumber == null)
                return setTimeout(function() {
                    self.checkTransaction(hash, callback);
                }, 500);

            callback(block);
        });
    };

    self.importWallet = function(passphrase) {
        return web3.eth.personal.newAccount(passphrase);
    };

    self.getAccounts = function() {
        return web3.eth.getAccounts();
    };

    self.topUpAddress = function(address, amount) {

        return new Promise(function(resolve, reject) {
            self.unlockAccount(sponsor.public, sponsor.private, 600)
                .then(function (account) {

                    if (account) {
                        const rawTransaction = {
                            "from": sponsor.public,
                            "to": address,
                            "value": web3.utils.toWei(amount.toString(), "ether")
                        };

                        return web3.eth.sendTransaction(rawTransaction, function (err, transactionHash) {

                            if (err) {
                                return reject(err);
                            }

                            self.checkTransaction(transactionHash, function (block) {
                                resolve(block);
                            });
                        });
                    } else {
                        return reject('Account not unlocked');
                    }

                });
        });
    };


    self.transferEther = function(addressFrom, privateFrom, addressTo, amount) {

        return new Promise(function(resolve, reject) {
            self.unlockAccount(addressFrom, privateFrom, 600)
                .then(function (account) {

                    if (account) {
                        const rawTransaction = {
                            "from": addressFrom,
                            "to": addressTo,
                            "value": web3.utils.toWei(amount.toString(), "ether")
                        };

                        return web3.eth.sendTransaction(rawTransaction, function (err, transactionHash) {

                            if (err) {
                                return reject(err);
                            }

                            self.checkTransaction(transactionHash, function (block) {
                                resolve(block);
                            });
                        });
                    } else {
                        return reject('Account not unlocked');
                    }

                });
        });
    };

    self.unlockAccount = function(public, private, duration) {
        return web3.eth.personal.unlockAccount(public, private, duration || 0);
    };

    return self;
};

module.exports = AccountsService;