const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');
const cors = require('cors');
const addPortfolioValue = require('./firebase/savePortfolioData');

const corsOptions = {
	origin: 'https://cryptodasher.com',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', cors(corsOptions), (req, res) => {
	const email = req.query.email;
	if (email) {
		addUserToEmailList(email);
		res.send('Success');
	} else {
		res.send('No email to add');
	}
});

app.post('/addportfoliodata', (req, res) => {
	const authorized = req.query.key === process.env.addPortfolioKey;
	if (authorized) {
		addPortfolioValue(res);
	} else {
		res.send('You are unauthorized to perform this action.');
	}
});

app.listen(port, () => {
	console.log('Listening on' + port);
});
