/** Env file */
const env = require('../../../env');

/** Libs */
const Tx = require("ethereumjs-tx").Transaction;
const sprintf = require('sprintf-js').sprintf;

/** Services */
const logger = require('../LogService');

/** Providers */
const web3 = require('../../providers/web3');

/**
 * TransactionsService
 */
const TransactionsService = function() {
    this.store = async function(transaction, private) {
        try {
            logger.log('access', 'Create transaction', transaction);

            let gasPrice = parseInt(web3.utils.toWei(env.gasPrice.toString(), 'gwei'));
            let gasLimit = parseInt(env.gasLimit);
            let privateKey = Buffer.from(private, 'hex');

            let rawTransaction = Object.assign({
                nonce: (await web3.eth.getTransactionCount(transaction.from)),
                gasPrice: gasPrice,
                gasLimit: gasLimit,
            }, transaction, {
                value: web3.utils.toHex(web3.utils.toWei(transaction.value.toString(), "ether"))
            });

            let txTransaction = new Tx(rawTransaction, {
                chain: await web3.eth.net.getId()
            });

            logger.log('access', sprintf(
                "Transaction data: %s\nTransaction upfront cost: %s",
                JSON.stringify(rawTransaction, null, '    '),
                web3.utils.fromWei(txTransaction.getUpfrontCost().toString(), "ether")
            ));

            txTransaction.sign(privateKey);

            return await web3.eth.sendSignedTransaction(
                '0x' + txTransaction.serialize().toString('hex')
            );
        } catch (error) {
            logger.log('error', error.toString());

            throw error;
        } 
    };
};

module.exports = new TransactionsService();