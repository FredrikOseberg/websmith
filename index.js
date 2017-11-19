const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');
const cors = require('cors');

const corsOptions = {
	origin: 'http://cryptodasher.com',
	optionsSuccessStatus: 200
};

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', cors(corsOptions), (req, res) => {
	const email = req.query.email;
	if (email) {
		addUserToEmailList(email);
	}
});

app.listen(port, () => {
	console.log('Listening');
});
