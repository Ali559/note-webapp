require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const apiEndPoint = require('./routes/apiEndpoint');
const cors = require('cors');
const cookieParser = require('cookie-parser');
mongoose.connect(process.env.CONNECTION_STRING);

mongoose.connection.on('open', (err) => {
	err ? console.error(err.message) : console.log('Database Connected');
});

app.use(cors({ origin: 'http://localhost:3000' }));
// app.use((_, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
// 	next();
// });

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(cookieParser());

app.use('/images', express.static(__dirname + '/public'));
app.use('/api', apiEndPoint);

app.listen(port, (err) => {
	err ? console.log(err.message) : console.log(`Listening on http://localhost:${port}`);
});
