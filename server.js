const express = require('express');
const app = express();
const addUserToEmailList = require('./api/mailchimp');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', (req, res) => {
	// const email = res.query.email;
	addUserToEmailList('fredrik.ose@gmail.com');
});

app.listen(3001, () => {
	console.log('Listening');
});
