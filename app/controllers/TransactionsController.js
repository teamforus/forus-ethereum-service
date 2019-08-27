/** Services */
const TransactionsService = require('../services/web3/TransactionsService');

/**
 * AccountsController
 */
const TransactionsController = function() {
    /**
     * Create new ethereum account
     */
    this.store = async (req, res) => {
        const private = req.body.private;
        const transaction = req.body.transaction;
        
        try {
            res.status(201).send({
                account: await TransactionsService.store(transaction, private)
            });
        } catch (error) {
            res.status(500).send({
                message: error.toString(),
            });
        }
    };
};

module.exports = new TransactionsController();