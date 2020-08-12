const { Listener } = require('discord-akairo');
const L = require('../logger');

class RateLimitListener extends Listener {
	constructor() {
		super('rateLimit', {
			emitter: 'client',
			event: 'rateLimit'
		});
	}

	async exec(info) {
		L.log(`Hit rate limit:`, info);
	}
}

module.exports = RateLimitListener;