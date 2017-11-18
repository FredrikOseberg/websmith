const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', (req, res) => {
	addUserToEmailList('fredrik.ose@gmail.com');
});

app.listen(port, () => {
	console.log('Listening');
});
