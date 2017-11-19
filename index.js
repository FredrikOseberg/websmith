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

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://cryptodasher.com');
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', cors(corsOptions), (req, res, next) => {
	const email = req.query.email;
	if (email) {
		addUserToEmailList(email);
	}
});

app.listen(port, () => {
	console.log('Listening');
});
