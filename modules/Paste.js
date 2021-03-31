const env = require('../config/env');
const fetch = require('node-fetch');

class Paste {
	constructor(title, content, format=null, privacy=null, expires=null) {
		this.data = {
			api_option:            'paste',
			api_dev_key:           env.api_key,
			api_paste_private:     privacy ? privacy : 1,
			api_paste_expire_date: expires ? expires : 'N',
			api_paste_format: 	   format ? format : 'text',
			api_paste_name:        title,
			api_paste_code:        content,
		}
	}
	async save() {
		const res =  await (await fetch(env.api_url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': new URLSearchParams(this.data).toString().length,
			},
			body: new URLSearchParams(this.data).toString(),
		})).text();

		if (res.match(/(Bad API request)/i)) {
			return {
				status: 0,
				message: res.match(/invalid (?<info>\S+)$/i).groups.info,
			};
		}

		return {
			status: 1,
			message: 'Successfully Pasted.',
			link: res,
			raw_link: env.suffix + res.match(/https\:\/\/pastebin\.com\/(?<id>\S+)$/i).groups.id,
		}
	}
}

module.exports = Paste;