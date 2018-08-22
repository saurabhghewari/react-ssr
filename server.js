/*
* Create a express server by importing all the express dependencies. 
* Using ES6 syntax to get familiar with es6.
*/

// Dependencies
import path from 'path';
import express from 'express';
import config from './config';
import apiRouter from './api';
import serverRender from './serverRender';
import sassMiddleware from 'node-sass-middleware';

// Create a http server using express. Express is wrapper over the http node module.
const server = express();

// Configure the sass middleware using server.use
server.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public')
}));

// Configure the template engine to have dynamic html pages using EJS(Effective Javascript)
server.set('view engine', 'ejs');

// Route example using express
server.get(['/', '/contests/:contestId'], (req, res) => {
	serverRender(req.params.contestId).then(({ initialMarkUp, initialData }) => {
		res.render('index', {
			initialMarkUp,
			initialData
		});
	}).catch(console.error);
});

// These the application routes which are interface to send or recieve data.
server.use('/api', apiRouter);

// Express static is server which serves the static html files on request from public folder.
server.use(express.static('public'));

// Start the server on the port specified or default.
server.listen(config.port, config.host, () => {
	console.log(`Server is listening on port ${config.port}`);
});
