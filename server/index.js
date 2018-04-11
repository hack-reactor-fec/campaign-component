const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
//const router = require('./routes.js');
const saveLevels = require('../db/index.js').saveLevels;
const getLevels = require('../db/index.js').getLevels;

var app = express();

let port = 3000;

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
// app.use('/levels', router);

app.get('/levels/:id', (req, res) => {
	getLevels(req.params.id)
	.then(results => {
		res.writeHead(200);
		res.end(results);
	})
	.catch(err => {
		console.log('ERROR in /levels', err);
		res.writeHead(404);
		res.end('');
	})
});

app.post('/levels', (req, res) => {
	saveLevels(req.body)
	.then(result => {
		res.writeHead(201);
		res.end('');
	})
	.catch(err => {
		console.log('ERROR in /levels', err);
		res.writeHead(404);
		res.end('');
	})
});

app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});