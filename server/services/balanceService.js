var sponsor = require('../storage/sponsor.json') || false;
let logger = require('../core/logger.js');

let BalanceService = function(web3) {
    var self = this;

    self.getBalance = function(public_key) {
        return new Promise(function(resolve, reject) {
            web3.eth.getBalance(public_key).then(function(balance) {
                resolve(web3.utils.fromWei(balance, "ether"));
            });
        });
    };

    return self;
};

module.exports = BalanceService;