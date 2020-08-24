const { Command } = require('discord-akairo');
const L = require('../logger');

const blacklistedWords = new Set(['NICE', 'OKAY', 'STFU', 'WHOA', 'GUYS', 'LMAO', 'ROFL', 'FUCK', 'BRUH', 'SHIT', 'WHAT', 'LULW', 'KEKW', 'LOLW', 'DUDE', 'HAHA', 'AHAH', 'LMOA', 'JOIN', 'COME']);

class CodeCommand extends Command {
	constructor() {
		super('code', {
			regex: /^[A-Z]{4}$/,
			channel: 'guild',
			clientPermissions: ['MANAGE_CHANNELS']
		});
	}

	async exec(msg) {
		if (!blacklistedWords.has(msg.content)) {
			await msg.react('👀');
			let oldCode = await this.client.settings.get(msg.guild.id, 'code', '');
			if (oldCode === msg.content) return;
			await this.client.settings.set(msg.guild.id, 'code', msg.content);

			let maxMembers = -1;
			let maxChannel = null;
			for (let vc of msg.guild.channels.cache.values()) {
				if (vc.type === 'voice') {
					if (vc.members.has(msg.author.id)) {
						maxChannel = vc;
						break;
					} else if (vc.members.size > maxMembers) {
						maxMembers = vc.members.size;
						maxChannel = vc;
					}
				}
			}
			maxChannel.edit({ name: `Voice | ${msg.content}` });
			msg.guild.me.edit({ nick: `${msg.content} | ${this.client.user.username}` });
			L.log(`Updated code to ${msg.content}`);
		}
	}
}

module.exports = CodeCommand;