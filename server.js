const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const User = require('./user');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	User.find({}).then((allUsers) => {
		res.json({
			status: 200,
			users: allUsers,
		});
	});
});

app.post('/', (req, res) => {
	User.create(req.body).then(() => {
		User.find({}).then((allUsers) => {
			res.json({
				status: 200,
				user: allUsers,
			});
		});
	});
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
	console.log('we in');
});

// "mongodb+srv://user2048:password2048@cluster0.f016w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"