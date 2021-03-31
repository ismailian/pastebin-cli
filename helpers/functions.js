const fs = require('fs');
const path = require('path');

const readFile = (filename) => {
	return fs.readFileSync(filename, 'utf-8');
};


module.exports = { readFile };