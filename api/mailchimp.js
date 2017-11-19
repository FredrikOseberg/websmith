var request = require('request');

function callback(error, response, body) {
	if (!error && response.statusCode == 200) {
		response.send('Success');
	}
}

module.exports = email => {
	var options = {
		url: 'https://us9.api.mailchimp.com/3.0/lists/11d80d6cd8/members/',
		method: 'POST',
		auth: {
			user: 'anystring',
			pass: process.env.mailchimpApi
		},
		body: JSON.stringify({
			email_address: email,
			status: 'subscribed'
		})
	};
	request(options, callback);
};
