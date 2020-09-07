const { Command } = require('discord-akairo');
const L = require('../logger');

class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue'],
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
		const list = queue === '' ? [] : queue.split(',');

		if (list.find(id => id === args.target.id)) return;

		list.push(args.target.id);
		await this.client.settings.set(msg.guild.id, 'queue', list.join(','));
		await msg.react('✔');
		L.log(`Queued ${args.target.user.tag}`);
		setTimeout(async () => {
			const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
			let list = queue === '' ? [] : queue.split(',');

			if (!list.find(id => id === args.target.id)) return;

			list = list.filter(id => id !== args.target.id);
			await this.client.settings.set(msg.guild.id, 'queue', list.join(','));
			try {
				await args.target.send(`You have been automatically dequeued from ${msg.guild.name} after 3 hours. Use \`!queue\` again in the server to re-queue yourself.`);
			} catch (e) {
				L.log(`Failed to DM ${args.target.user.tag}`, e);
			}
			L.log(`Dequeued ${args.target.user.tag} after 12 hours`);
		}, 1000 * 60 * 60 * 3);
	}
}

module.exports = QueueCommand;