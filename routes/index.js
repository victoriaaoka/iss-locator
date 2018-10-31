const express = require('express');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();

// GET / ie. the index page
router.get('/', function(req, res, next) {
	return res.render('index');
});

// GET /about
router.get('/about', function(req, res, next) {
	return res.render('about', { title: 'About' });
});

//GET /login
router.get('/login', function(req, res, next){
	return res.render('login', {title: 'Log In'});
});

// POST /login
router.post('/login', function(req, res, next) {
	if (req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function (error, user) {
			if (error || !user) {
				const err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			}  else {
				req.session.userId = user._id;
				return res.redirect('/home');
			}
		});
	} else {
		const err = new Error('Email and password are required.');
		err.status = 400;
		return next(err);
	}
});

//GET /map
router.get('/map', function(req, res, next){
	return res.render('gmap', {title: 'Map', pos: req.query, apiKey: process.env.GOOGLE_MAPS_API_KEY});

});

//GET /register
router.get('/register', function(req, res, next){
	return res.render('register', {pos: req.query});
});

//POST /register
router.post('/register', function(req, res, next){
  
	if(
		req.body.email &&
    req.body.name &&
    req.body.city &&
    req.body.password &&
    req.body.confirmPassword
	){
		// Check password confirmation
		if(req.body.password !== req.body.confirmPassword){
			const err = new Error('The passwords do not match!');
			err.status = 400;
			return next(err);
		}
		//Create a data object
		const userData = {
			email: req.body.email,
			name: req.body.name,
			city: req.body.city,
			password: req.body.password
		};

		// Use the Schema's create method to insert documents into mongo.
		User.create(userData, function(error, user){
			if(error){
				return next(error);
			}else{
				req.session.userId = user._id;
				return res.redirect('/home');
			}
		});

	} else {
		const err = new Error('All fields are required!');
		err.status = 400;
		return next(err);
	}
});

// GET /home
router.get('/home', function(req, res, next) {
	if (! req.session.userId ) {
		const err = new Error('Please login to view this page.');
		err.status = 403;
		return next(err);
	}
	User.findById(req.session.userId)
		.exec(function (error, user) {
			if (error) {
				return next(error);
			} else {
				return res.render('home', { 
					title: 'Home', 
					name: user.name, 
					apiKey: process.env.GOOGLE_MAPS_API_KEY, 
					city: user.city});
			}
		});
});

//POST /home
router.post('/home', function(req, res, next){ 
	if(! req.body.search){
		const err = new Error('Please enter a Place Name or address to search!');
		err.status = 400;
		return next(err);
	}
  
});

//GET /passtimes
router.get('/passtimes', function(req, res, next){
	if (! req.session.userId ) {
		const err = new Error('Please login to view this page.');
		err.status = 403;
		return next(err);
	}
	return res.render('passtimes', {place: req.query, apiKey: process.env.GOOGLE_MAPS_API_KEY}); 
});

// GET /logout
router.get('/logout', function(req, res, next) {
	if (req.session) {
		// delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;
