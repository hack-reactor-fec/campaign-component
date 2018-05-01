const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
//const router = require('./routes.js');
const getLevels = require('../db/index.js').getLevels;
const getAboutInfo = require('../db/index.js').getAboutInfo;
const saveUserNewBackedProjects = require('../db/index.js').saveUserNewBackedProjects;
const Project = require('../db/index.js').Project;
const User = require('../db/index.js').User;


var app = express();

let port = process.env.PORT || 3003;

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cors());

// Set up our routes
// app.use('/levels', router);

app.get('/levels/:projectId', (req, res) => {
	getLevels(req.params.projectId)
	.then(results => {
		res.writeHead(200);
		res.end(results);
	})
	.catch(err => {
		console.log('ERROR in get /levels', err);
		res.writeHead(404);
		res.end('');
	});
});

app.get('/about/:projectId', (req, res) => {
	getAboutInfo(req.params.projectId)
	.then(results => {
		res.writeHead(200);
		res.end(results);
	})
	.catch(err => {
		console.log('ERROR in get /about', err);
		res.writeHead(404);
		res.end('');
	});
});

app.post('/users', (req, res) => {
	let userNewProject = req.body;
	saveUserNewBackedProjects(userNewProject)
	.then(result => {
		res.writeHead(201);
		res.end('');
	})
	.catch(err => {
		console.log('error in post /users');
		res.writeHead(404);
		res.end('');
	});
});

app.post('/:projectId/:levelId/:pledgeAmount', (req, res) => {
	let projectId = req.params.projectId;
	let levelId = req.params.levelId;
	let pledgeAmount = req.params.pledgeAmount;
	let query = {};
	query['id'] = projectId;
	Project.findOne(query)
	.then((err, result) => {
		for (let i = 0; i < result.levels.length; i++) {
			if (result.levels[i].id === levelId) {
				result.levels[i].numberOfBackers += 1;
			}
		}
		let projectData = new Project(result);
		projectData.save(err => {
			if (err) {
				res.end('');
			} else {
				res.writeHead(201);
				res.end(err);
			}
		});
	})
	.catch(err => {
		console.log('error in post /:projectId/:levelId/:pledgeAmount');
		res.writeHead(404);
		res.end(err);
	})
})

app.post('/:projectId/:pledgeAmount', (req, res) => {
	let projectId = req.params.projectId;
	let pledgeAmount = req.params.pledgeAmount;
	let query = {};
	query['id'] = projectId;
	Project.findOne(query)
	.then((err, result) => {
		result.numberOfBackers += 1;
		let projectData = new Project(result);
		projectData.save(err => {
			if (err) {
				res.end('');
			} else {
				res.end(err);
			}
		});
	})
	.catch(err => {
		console.log('error in post /:projectId/:pledgeAmount');
		res.end(err);
	})
})

app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});