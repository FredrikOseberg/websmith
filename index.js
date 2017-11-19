const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');
const cors = require('cors');

app.use(express.static(__dirname));

app.use(
	cors({
		origin: 'https://cryptodasher.com'
	})
);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', (req, res) => {
	const email = req.query.email;
	if (email) {
		addUserToEmailList(email);
	}
});

app.listen(port, () => {
	console.log('Listening');
});
