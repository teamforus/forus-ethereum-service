/** 
 * Please generate new api_key for production and replace allowed ip
 * 
 * */ 
module.exports = {
    // the listening host
    host: "0.0.0.0",
    // the listening port
    port: 8500,
    // allow request only with this key in header
    api_key: "Upa82GHScBh28GUgeGXaRYwF78psuGbVDPJU8dNtchrZeFsZUT3hTFugJ4ch6ZXP",
    // string or array of ip addresses which are allowed to use this api
    allowed_ip: "*",
    // path to the IPC file
    ipc_path: "/opt/ethereum/data/geth.ipc",
    // RPC address, 
    rpc_address: false, // "https://rinkeby.infura.io/v3/{PROJECT_KEY}",
    // ethereum log file
    ethereum_log: "/opt/ethereum/logs/miner-worker.log",
    // gas price in Gwei (1 Gwei 1000000000 Wei)
    gasPrice: 40,
    // gas limit
    gasLimit: 100000,
};
