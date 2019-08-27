var env = require('../../env.js');

let Web3 = require("web3");
let ipc_path = env.ipc_path;
let rpc_address = env.rpc_address;

if (ipc_path) {
    module.exports = new Web3(new Web3.providers.IpcProvider(ipc_path, new require("net").Socket()));
} else if (rpc_address) {
    module.exports = new Web3(new Web3.providers.HttpProvider(rpc_address, new require("net").Socket()));
} else {
    module.exports = null;
}