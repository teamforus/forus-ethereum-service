const env = require('../../env.js');

const apiKey = env.api_key;
const allowedIp = typeof env.allowed_ip ? [env.allowed_ip] : env.allowed_ip;

const AuthModdleware = (req, res, next) => {
    if (req.get('Api-Key') != apiKey && req.query.apiKey != apiKey) {
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
};

module.exports = AuthModdleware;