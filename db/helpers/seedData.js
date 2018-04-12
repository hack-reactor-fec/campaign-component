var faker = require('faker');
const saveProjects = require('../index.js').saveProjects;
const saveUsers = require('../index.js').saveUsers;

// seed levels collection
// just pass in array of objects to saveProjects and it will create new models
var projects = [];
// do this for 100 projects
for (var i = 1; i <= 100; i++) {
	var tempProject = {}
	tempProject['id'] = i;
	// pick a number of levels at random between 3 and 8
	tempLevels = [];
	var numLevels = 3 + Math.floor(Math.random() * 8);
	for (var j = 0; j < numLevels; j++) {
		var tempLevel = {};
		tempLevel['cutoffAmount'] = faker.commerce.price();
		tempLevel['name'] = faker.company.bsNoun();
		tempLevel['description'] = faker.lorem.sentence();
		// each level includes 1 to 3 things
		var numIncludes = 1 + Math.floor(Math.random() * 3);
		var includesArray = [];
		for (var k = 0; k < numIncludes; k++) {
			includesArray.push(faker.lorem.words())
		}
		tempLevel['includes'] = includesArray;
		tempLevel['estimatedDelivery'] = faker.date.future();
		tempLevel['shipsTo'] = faker.address.country();
		tempLevel['numberOfBackers'] = Math.floor(Math.random() * 100);
		if (Math.random() < 0.10) {
			tempLevel['maxBackers'] = tempLevel['numberOfBackers'];
		} else {
			let continueMaxBackersSearch = true;
			while(continueMaxBackersSearch) {
				let maxBackers = Math.floor(Math.random() * 101);
				if (maxBackers > tempLevel['numberOfBackers']) {
					continueMaxBackersSearch = false;
					tempLevel['maxBackers'] = maxBackers;
				}
			}
		}
		tempLevels.push(tempLevel);
	}
	tempProject['levels'] = tempLevels;
	tempProject['aboutInfo'] = faker.lorem.paragraphs();
	projects.push(tempProject);
}

// seed user collection
// create array of users that will be added to user collection
var users = [];
// keep track of usernames already used since that value has to be unique
var takenUsers = {};
// create 1000 users
for (var i = 1; i <= 1000; i++) {
	var tempUser = {};
	// ensure unique username
	var continueUserNameSearch = true;
	while (continueUserNameSearch) {
		var tempUserName = faker.internet.userName();
		if (!(tempUserName in takenUsers)) {
			continueUserNameSearch = false;
		}
	}
	tempUser['username'] = tempUserName;
	// choose random number of projects between 1 and 7
	var numProjects = 1 + Math.floor(Math.random() * 7);
	var tempProjectsBacked = [];
	for (var j = 0; j < numProjects; j++) {
		var tempProjects = {};
		tempProjects['projectId'] = 1 + Math.floor(Math.random() * 100);
		tempProjects['amount'] = faker.commerce.price();
		tempProjectsBacked.push(tempProjects);
	}
	tempUser['projectsBacked'] = tempProjectsBacked;
	users.push(tempUser);
}

// save levels and users to database
saveProjects(projects)
.then(saveUsers(users))
.then((result) => {
	console.log('done');
})
.catch(err => {
	console.log(err);
})
