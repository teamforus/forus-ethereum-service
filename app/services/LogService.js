const fs = require("fs");
const path = require("path");
const sprintf = require('sprintf-js').sprintf;
const moment = require('moment');

const LogService = function() {
    let logPath = path.resolve(__dirname + "/../storage/logs/");

    this.log = function(file) {
        let data = Array.from(arguments).slice(1).map(function(el) {
            if (typeof el == 'object')
                return JSON.stringify(el, null, '    ');
            
            return el;
        }).join('');

        if (!fs.existsSync(logPath)) {
            fs.mkdirSync(logPath);
        }

        data = moment().format('YYYY-MM-DD HH:mm:ss') + ': ' + data;

        console.log(data);
        fs.appendFileSync(sprintf(logPath + "/%s", file), data + "\n");
    };
};

module.exports = new LogService();
