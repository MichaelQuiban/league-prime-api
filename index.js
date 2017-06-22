const {User} = require('./models');
const {Champion} = require('./championRouter');
const {Router} = require('./userRouter');

router.get('/', function(req, res, next) {
	res.render('index', {title: 'Form Validation', success: false, errors: req.session.errors});
	req.session.errors = null;
});

router.post('/submit', function(req, res, next) {
	//Check validity of the form
	req.check('username', 'Invalid username provided').isEmail();
	req.check('password', 'Password is invalid').isLength({min:4}).equals(req.body.password);

	let errors = req.validationErrors();
	if(error) {
		req.session.errors = errors;
	}
	res.redirect('/');
});

module.exports = {User, Champion, Router};