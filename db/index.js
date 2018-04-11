const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kickstarter');

const Schema = mongoose.Schema;

let levelSchema = new Schema({
	'id': {
		type: Number, 
		unique: true
	},
	'productId': Number,
	'cutoffAmount': Number,
	'name': String,
	'description': String,
	'includes': [String],
	'estimatedDelivery': Date,
	'shipsTo': String,
	'numberBackers': Number
});

let userSchema = new Schema({
	'username': {
		type: String, 
		unique: true
	},
	'productsBacked': [{'productId': Number, 'amount': Number}]
});

let Level = mongoose.model('Level', levelSchema);
let User = mongoose.model('User', userSchema);

let saveUser = (user) => {
	return new Promise((resolve, reject) => {
		let userData = new User(user);
		userData.save(err => {
			if (err) {
				console.log('ERROR in saveUser', err);
				reject(err);
			} else {
				resolve(1);
			}
		});
	})
}

let saveLevels = (levels) => {
	var promiseArray = [];
	for (let i = 0; i < levels.length; i++) {
		promiseArray.push(new Promise((resolve, reject) => {
			let levelData = new Level(levels[i]);
			levelData.save(err => {
				if (err) {
					console.log('ERROR in saveLevels', err);
					reject(err);
				} else {
					resolve(1);
				}
			});
		}));
	}
	return Promise.all(promiseArray);
}

let getLevels = (productId) => {
	return new Promise((resolve, reject) => {
		let query = {};
		query['id'] = productId;
		Level.find(query).
		sort({cutoffAmount: 1}).
		exec((err, levels) => {
			if (err) {
				reject(err);
			} else {
				resolve(levels);
			}
		})
	});
}

module.exports.saveUser = saveUser;
module.exports.saveLevels = saveLevels;
module.exports.getLevels = getLevels;