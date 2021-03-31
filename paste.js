const env = require('./config/env');
const Cla = require('command-line-args');
const chalk = require('chalk');
const Paste = require('./modules/Paste');
const helpers = require('./helpers/functions');


/**
* handle user input..
*/
const args = Cla(env.options);

if (args.title && (args.content || args.file)) {

	(async () => {

		var paste;

		/**
		* Privacy options
		*/
		if (args.privacy) {
			if (!env.params.privacy.includes(args.privacy)) {
				return console.log('[x]', chalk.red('INVALID_PRIVACY_OPTION'));
			}
		}

		/**
		* Expirations options
		*/
		if (args.expires) {
			if (!env.params.expiration.includes(args.expires)) {
				return console.log('[x]', chalk.red('INVALID_EXPIRE_OPTION'));
			}
		}

		/**
		* Formats options
		*/
		if (args.format) {
			if (!env.params.formats.includes(args.format)) {
				return console.log('[x]', chalk.red('INVALID_FORMAT_OPTION'));
			}
		}


		if (args.content) {
			paste = new Paste(args.title, args.content, args.format, args.privacy, args.expires);
		}

		if (args.file) {
			paste = new Paste(args.title, helpers.readFile(args.file), args.format, args.privacy, args.expires);
		}

		const output = await paste.save();
		console.log(output);

	})();
}