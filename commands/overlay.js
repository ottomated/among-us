const { Command } = require('discord-akairo');
const L = require('../logger');

class OverlayCommand extends Command {
	constructor() {
		super('overlay', {
			aliases: ['overlay'],
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
		console.log(msg, args);
		if (!args.channel) {
			return msg.channel.send(`Please supply a channel to generate the overlay link for, i.e. \`!overlay ${msg.guild.channels.cache.find(c => c.type === 'voice').name}\``);
		}
		return msg.channel.send(`**Overlay for ${args.channel.name}:**\n\nhttps://streamkit.discord.com/overlay/voice/${msg.guild.id}/${args.channel.id}?icon=true&online=true&logo=white&text_color=%23ffffff&text_size=28&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=jreTYZS&limit_speaking=true&small_avatars=false&hide_names=false&fade_chat=0`)
	}
}

module.exports = OverlayCommand;