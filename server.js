const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const User = require('./user');
require('dotenv').config();
const admin = process.env.ADMIN_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
	origin: 'https://philaung96.github.io/2048/',
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
	if (req.body.admin === admin) {
		User.create(req.body.user).then(() => {
			User.find({}).then((allUsers) => {
				res.json({
					status: 200,
					user: allUsers,
				});
			});
		});
	} else
		res.json({
			status: 401,
			msg: 'Unauthorized access',
		});
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
	console.log('we in');
});
