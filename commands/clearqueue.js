const { Command } = require('discord-akairo');
const L = require('../logger');

class ClearQueueCommand extends Command {
	constructor() {
		super('clearqueue', {
			aliases: ['clearqueue', 'clearq'],
			channel: 'guild'
		});
	}

	async exec(msg) {
		await this.client.settings.set(msg.guild.id, 'queue', '');
		await msg.react('✔');
	}
}

module.exports = ClearQueueCommand;