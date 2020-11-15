require('dotenv').config();
const { AkairoClient, CommandHandler, SQLiteProvider, ListenerHandler } = require('discord-akairo');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const L = require('./logger');
const { ApiClient } = require('twitch');
const { StaticAuthProvider } = require('twitch-auth');

class AmongUsClient extends AkairoClient {
	constructor() {
		super({
			ownerID: '194259969359478784',
		}, {});
		// Load Commands
		this.commandHandler = new CommandHandler(this, {
			directory: './commands/',
			prefix: '!'
		});
		this.commandHandler.loadAll();

		this.listenerHandler = new ListenerHandler(this, {
			directory: './listeners/'
		});
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
		// Set up database

	}
	async login(token) {
		this.database = await sqlite.open({
			filename: './db.sqlite',
			driver: sqlite3.Database
		});
		const table_exists = await this.database.get("SELECT name FROM sqlite_master WHERE type='table' AND name='among_us'");
		// console.log(table_exists);
		if (!table_exists) {
			L.log("Creating table");
			await this.database.run("create table among_us(id text, code text, queue text)");
		}
		this.settings = new SQLiteProvider(this.database, 'among_us');
		await this.settings.init();

		const auth = new StaticAuthProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);

		this.twitch = new ApiClient({ authProvider: auth });

		return super.login(token);
	}
}

const client = new AmongUsClient();
client.login(process.env.TOKEN);