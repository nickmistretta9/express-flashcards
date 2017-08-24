const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.err = err;
	res.status(err.status);
	res.render('error.hbs', {message: err.message, status: err.status, stack: err.stack});
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});