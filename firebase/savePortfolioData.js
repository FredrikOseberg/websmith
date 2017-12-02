const admin = require('firebase-admin');
const map = require('lodash/map');
const axios = require('axios');

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.projectId,
		clientEmail: process.env.clientEmail,
		privateKey: JSON.parse(process.env.firebaseKey)
	}),
	databaseURL: process.env.dbName
});

const db = admin.database();

function addPortfolioValue(response) {
	const databaseRef = db.ref('/users/Y7sfciTW9vOpW5HUv0tXLsBPVm32');

	databaseRef.once('value', snapshot => {
		let portfolioValue = 0;
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
						.child(timestamp)
						.set({
							portfolioValue,
							timestamp
						});
					response.send('Added portfoliovalue');
				})
				.catch(error => {
					addPortfolioVal(requests);
				});
		}

		addPortfolioVal(requests);
	});
}

module.exports = response => {
	addPortfolioValue(response);
};
