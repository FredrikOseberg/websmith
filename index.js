const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');
const cors = require('cors');
// const addPortfolioValue = require('./firebase/savePortfolioData');

const corsOptions = {
	origin: 'https://cryptodasher.com',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const cronJobCors = {
	origin: 'https://cron-job.org/',
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
		res.send('Success');
	} else {
		res.send('No email to add');
	}
});

// app.post('/addportfoliodata', cors(cronJobCors), (req, res) => {
// 	addPortfolioValue(res);
// });

app.listen(port, () => {
	console.log('Listening');
});
