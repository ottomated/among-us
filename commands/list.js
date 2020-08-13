const { Command } = require('discord-akairo');
const L = require('../logger');

class ListCommand extends Command {
	constructor() {
		super('list', {
			aliases: ['list'],
			channel: 'guild'
		});
	}

	async exec(msg) {
		const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
		let list = queue === '' ? [] : queue.split(',');
		list = list.map(id => msg.guild.members.resolve(id)).filter(user => user);

		list = list.filter(member => !member.voice.channel);
		await this.client.settings.set(msg.guild.id, 'queue', list.map(member => member.id).join(','));

		if (list.length === 0)
			return msg.channel.send("**0 users in queue**");
		else
			return msg.channel.send(`**Users in queue:** (${list.length})\n${list.map(user => user.displayName).join('\n')}`);
	}
}

module.exports = ListCommand;