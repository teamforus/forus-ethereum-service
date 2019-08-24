// please generate new api_key for production and replace allowed ip 
module.exports = {
    // the listening host
    "host": "0.0.0.0",
    // the listening port
    "port": 8500,
    // allow request only with this key in header
    "api_key": "++4#?LZQQnP7sE!X!Vuq?$mM4F?KybmUTbg9$EghQWX_g6^+r$QcyM8zcV9$C=5F",
    // string or array of ip addresses which are allowed to use this api
    "allowed_ip": "*",
    // path to the ipc file
    "ipc_path": "/opt/ethereum/data/geth.ipc",
    // ethereum log file
    "ethereum_log": "/opt/ethereum/logs/miner-worker.log"
};
