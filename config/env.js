const env = {
	api_url: "https://pastebin.com/api/api_post.php",
	api_key: "YOUR_API_KEY",
	suffix: "https://pastebin.com/raw/",
	params: {
		formats: ['text', 'php'],
		privacy: [0, 1, 2],
		expiration: ['N', '10M', '1H', '1D', '1W', '2W', '1M', '6M', '1Y'],
	},
	options: [
		{
			name: 'title',
			type: String,
			required: true,
		},
		{
			name: 'content',
			type: String,
			required: true,
		},
		{
			name: 'file',
			type: String,
			required: true,
		},
		{
			name: 'format',
			type: String,
			required: true,
			defaultOption: 'text',
		},
		{
			name: 'privacy',
			type: Number,
			required: true,
			defaultOption: 1,
		},
		{
			name: 'expires',
			type: String,
			required: true,
			defaultOption: 'N',	
		},
	],
}

module.exports = env;