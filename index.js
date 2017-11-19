const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const addUserToEmailList = require('./api/mailchimp');

const corsOptions = {
	origin: 'https://cryptodasher.com'
};
app.use(express.static(__dirname));

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
