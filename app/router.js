const router = require('express').Router();

/** Middlewares */
const AuthModdleware = require('./middlewares/AuthModdleware');
const LogEndpointMiddleware = require('./middlewares/LogEndpointMiddleware');

/** Controllers */
const AccountsController = require('./controllers/AccountsController');
const TransactionsController = require('./controllers/TransactionsController');

// Require authorization
router.use(AuthModdleware);

// Status
router.get('/', LogEndpointMiddleware, (req, res) => res.send({
    status: 'Up and Running.'
}));

// Create new wallet (ethereum account)
router.post('/api/accounts', LogEndpointMiddleware, AccountsController.store);

// Get address balance
router.get('/api/accounts/:address', LogEndpointMiddleware, AccountsController.balance);

// Transfer ethereum 
router.post('/api/transactions', LogEndpointMiddleware, TransactionsController.store);


module.exports = router;