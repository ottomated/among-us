const { Command } = require('discord-akairo');
const L = require('../logger');

class QueueCommand extends Command {
	constructor() {
		super('dequeue', {
			aliases: ['dequeue', 'remove', 'unqueue'],
			channel: 'guild',
			args: [
				{
					id: 'target',
					type: 'member',
					unordered: true,
					default: msg => msg.member
				}
			]
		});
	}

	async exec(msg, args) {
		const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
		let list = queue === '' ? [] : queue.split(',');
		
		if (!list.find(id => id === args.target.id)) return;

		list = list.filter(id => id !== args.target.id);
		await this.client.settings.set(msg.guild.id, 'queue', list.join(','));
		await msg.react('✔');
		L.log(`Dequeued ${args.target.user.tag}`);
	}
}

module.exports = QueueCommand;