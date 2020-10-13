const { Command } = require('discord-akairo');
const L = require('../logger');
const { inspect } = require('util');

const clean = text => {
	if (typeof (text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

class EvalCommand extends Command {
	constructor() {
		super('eval', {
			aliases: ['eval'],
			ownerOnly: true,
		});
	}
	async exec(msg) {
		const args = msg.content.split(" ").slice(1);

		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = inspect(evaled);

			msg.channel.send(clean(evaled), { code: "xl" });
		} catch (err) {
			msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}
}

module.exports = EvalCommand;