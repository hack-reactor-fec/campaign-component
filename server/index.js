const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
//const router = require('./routes.js');
const getLevels = require('../db/index.js').getLevels;
const getAboutInfo = require('../db/index.js').getAboutInfo;
const saveUserNewBackedProjects = require('../db/index.js').saveUserNewBackedProjects;

var app = express();

let port = 3000;

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

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
	let userNewProject = JSON.parse(req.body);
	saveUserNewBackedProjects(userNewProject)
	.then(result => {
		res.writeHead(201);
		res.end('');
	})
	.catch(err => {
		res.writeHead(404);
		res.end('');
	});
});

app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});