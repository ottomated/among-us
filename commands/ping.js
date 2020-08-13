const { Command } = require('discord-akairo');
const L = require('../logger');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			channel: 'guild',
			args: [
				{
					id: 'action',
					type: ['first', 'all'],
					default: 'all'
				}
			]
		});
	}

	async exec(msg, args) {
		const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
		let list = queue === '' ? [] : queue.split(',');
		list = list.map(id => msg.guild.members.resolve(id)).filter(user => user);

		list = list.filter(member => !member.voice.channel);
		await this.client.settings.set(msg.guild.id, 'queue', list.map(member => member.id).join(','));

		if (list.length === 0)
			return msg.channel.send("**0 users in queue**");
		else {
			if (args.action === 'first') {
				let otherUsersText = '';
				if (list.length > 1) otherUsersText = `\n**Other users:**\n${list.slice(1).map(user => user.displayName).join('\n')}`;
				return msg.channel.send(`**Pinging first in queue:**\n<@${list[0].id}>${otherUsersText}`);
			}
			return msg.channel.send(`**Pinging ${list.length} user${list.length === 1 ? '' : 's'}:**\n${list.map(user => `<@${user.id}>`).join('\n')}`);
		}
	}
}

module.exports = PingCommand;