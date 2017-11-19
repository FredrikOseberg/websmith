const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');

app.use(express.static(__dirname));

var corsOptions = {
	origin: 'https://cryptodasher.com',
	optionsSuccessStatus: 200
};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', cors(corsOptions), (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	const email = req.query.email;
	if (email) {
		addUserToEmailList(email);
	}
});

app.listen(port, () => {
	console.log('Listening');
});
