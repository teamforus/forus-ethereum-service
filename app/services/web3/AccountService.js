/** Libs */
const colors = require('colors');
const sprintf = require('sprintf-js').sprintf;

/** Services */
const logger = require('../LogService');

/** Providers */
const web3 = require('../../providers/web3');

/**
 * AccountService
 */
const AccountService = function() {
    this.store = async function(passphrase) {
        try {
            logger.log('access', 'Create account');
            let account = await web3.eth.accounts.create(passphrase);
            logger.log('access', colors.green("New account created: " + account.address));

            return account;
        } catch (error) {
            logger.log('error', error.toString());

            throw error;
        }
    };

    this.balance = async function(address) {
        try {
            let weiBalance = await web3.eth.getBalance(address);
            let ethBalance = web3.utils.fromWei(weiBalance, "ether");

            logger.log('access', sprintf(
                "Account balance for%s: %s",
                colors.green(address),
                colors.green(ethBalance + " ether(s)"),
            ));

            return ethBalance;
        } catch (error) {
            logger.log('error', error.toString());

            throw error;
        }
    };
};

module.exports = new AccountService();