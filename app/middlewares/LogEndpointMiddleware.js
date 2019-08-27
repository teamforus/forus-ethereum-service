const colors = require('colors');
const logger = require('../services/LogService');

const LogEndpointMiddleware = function(req, res, next) {
    logger.log('access', "Endpoint reached:", colors.green(req.route.path));
    next();
};

module.exports = LogEndpointMiddleware;