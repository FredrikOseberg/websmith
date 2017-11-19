const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', (req, res) => {
	const origin = req.get('origin');
	if (origin === 'https://cryptodasher.com') {
		const email = req.query.email;
		if (email) {
			addUserToEmailList(email);
		}
	} else {
		res.send('You are not authorized to perform this action');
	}
});

app.listen(port, () => {
	console.log('Listening');
});
