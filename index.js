const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', (req, res) => {
	if (req.connection.remoteAddress === '151.101.65.195') {
		const email = req.query.email;
		addUserToEmailList(email);
	} else {
		res.send('You are not authorized to perform this operation');
	}
});

app.listen(port, () => {
	console.log('Listening');
});
