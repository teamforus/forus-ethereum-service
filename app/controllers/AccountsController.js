/** Services */
const AccountService = require('../services/web3/AccountService');

/**
 * AccountsController
 */
const AccountsController = function() {
    /**
     * Create new ethereum account
     */
    this.store = async (req, res) => {
        try {
            res.status(201).send({
                account: await AccountService.store(req.body.passphrase)
            });
        } catch (error) {
            res.status(500).send({
                message: error.toString(),
            });
        }
    };

    /**
     * Get account ballance
     */
    this.balance = async (req, res) => {
        try {
            res.status(200).send({
                balance: await AccountService.balance(req.params.address)
            });
        } catch (error) {
            res.status(500).send({
                message: error.toString(),
            });
        }
    };
};

module.exports = new AccountsController();