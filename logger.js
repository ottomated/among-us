const moment = require('moment');
const chalk = require('chalk');

function generateTimestamp() {
	return chalk.green(moment().format("MMM D - HH:mm:ss"));
}

module.exports = {
	log: (...args) => {
		console.log(generateTimestamp(), ...args);
	}
}