const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const addUserToEmailList = require('./api/mailchimp');
const ipFilter = require('express-ipfilter').IpFilter;

const ips = ['151.101.65.195', '151.101.1.195'];

app.use('/addtoemail', ipFilter(ips, { mode: 'allow' }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.post('/addtoemail', (req, res, next) => {
	const email = req.query.email;
	if (email) {
		addUserToEmailList(email);
	}
});

app.listen(port, () => {
	console.log('Listening');
});
