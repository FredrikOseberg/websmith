const admin = require('firebase-admin');
const map = require('lodash/map');
const axios = require('axios');

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.projectId,
		clientEmail: process.env.clientEmail,
		privateKey: process.env.firebaseApiKey.replace(/\\n/g, '\n')
	}),
	databaseURL: process.env.dbName
});

const db = admin.database();

function addPortfolioValue(response) {
	const databaseRef = db.ref('/users');

	databaseRef.once('value', snapshot => {
		const users = snapshot.val();
		const userUid = Object.keys(users);

		userUid.map(user => {
			addPortfolioValueToEachUser(user);
		});

		response.send('Added portfoliovalue');
	});

	function addPortfolioValueToEachUser(user) {
		let portfolioValue = 0;
		const databaseRef = db.ref(`/users/${user}`);

		databaseRef.once('value', snapshot => {
			const currencies = snapshot.child('currencies').val();
			const requests = map(currencies, currency => {
				if (currency.wallet) {
					return new Promise((resolve, reject) => {
						axios
							.get(`https://www.coincap.io/page/${currency.symbol}`)
							.then(response => {
								portfolioValue += response.data.price * currency.wallet.amount;
								resolve();
							})
							.catch(error => {
								reject(error);
							});
					});
				}
			});

			function addPortfolioVal(requests) {
				Promise.all(requests)
					.then(() => {
						const timestamp = Date.now();
						databaseRef
							.child('portfolio')
							.child('data')
							.child(timestamp)
							.set({
								portfolioValue,
								timestamp
							});
					})
					.catch(error => {
						addPortfolioVal(requests);
					});
			}

			addPortfolioVal(requests);
		});
	}
}

module.exports = response => {
	addPortfolioValue(response);
};
