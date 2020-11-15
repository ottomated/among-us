const { Command } = require('discord-akairo');
const L = require('../logger');
const { VoiceChannel } = require('discord.js');

class LobbyCommand extends Command {
	constructor() {
		super('lobby', {
			aliases: ['lobby'],
			channel: 'guild',
			args: [
				{
					id: 'channel',
					type: 'voiceChannel',
					default: msg => msg.member.voice.channel,
					match: "content",
				}
			]
		});
	}

	async exec(msg, args) {
		if (args.channel) {
			return msg.channel.send(`**Squad List for ${args.channel.name}:**\n${args.channel.members.map(m => m.displayName).join(', ')}`);
		} else {
			let text = [];
			for (let channel of msg.guild.channels.cache.values()) {
				if (channel.type === 'voice' && channel.members.size > 0) {
					text.push(`**Squad List for ${channel.name}:**\n${channel.members.map(m => m.displayName).join(', ')}`)
				}
			}
			return msg.channel.send(text.join('\n\n'));
		}
	}
}

module.exports = LobbyCommand;