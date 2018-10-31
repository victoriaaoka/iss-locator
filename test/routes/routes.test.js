const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Unit testing the /index route', function() {

	it('should return OK status with a GET request', function() {
		//Test that GET /index route returns a status code of 200
		return request(app)
			.get('/')
			.then(function(response){
				assert.equal(response.status, 200);
			});
	});

	it('should return text on rendering', function() {
		//Test that GET /index route renders the landing page text
		return request(app)
			.get('/')
			.then(function(response){
				expect(response.text).to.contain('The International Space Station Locator');
			});
	});

});

describe('Unit testing the /login route', function() {

	it('should return OK status with a GET request', function() {
		//Test that GET /login route returns a status code of 200
		return request(app)
			.get('/login')
			.then(function(response){
				assert.equal(response.status, 200);
			});
	});

	it('should return login on rendering', function() {
		//Test that GET /login route renders the login form
		return request(app)
			.get('/login')
			.then(function(response){
				expect(response.text).to.contain('Login');
			});
	});

	it('it should return an error when a non-registered user logs in', (done) => {
		//Test that a non-registered user cannot login
		const  logindata = {
			email:'notregduser@gmail.com',
			password:'Vaoka123',
		};
		request(app)
			.post('/login')
			.send(logindata)
			.end((err, res) => { 
				expect(res).to.exist;
				expect(res).have.property('text')
					.to.contain('Wrong Email or password');
			}).finally(done()
			);
	});

	it('it should return an error when a user logs in without credentials', (done) => {
		//Test that a user cannot login without credentials
		const  logindata = {
			email:'',
			password:'',
		};
		request(app)
			.post('/login')
			.send(logindata)
			.end((err, res) => { 
				expect(res).to.exist;
				expect(res.status).to.equal(400);
				expect(res).have.property('text')
					.to.contain('Email and password are required.');
				done();
			});
	});

});

describe('Unit testing the /register route', function() {

	it('should return OK status with a GET request', function() {
		//Test that GET /register route returns a status code of 200
		return request(app)
			.get('/register')
			.then(function(response){
				assert.equal(response.status, 200);
			});
	});

	it('should return a sign-up form on rendering', function() {
		//Test that GET /register route renders a Registration/Sign up form
		return request(app)
			.get('/register')
			.then(function(response){
				expect(response.text).to.contain('Sign Up');
			});
	});
});

describe('Unit testing the /map route', function() {

	it('should return OK status with a GET request', function() {
		//Test that GET /map route returns a status code of 200
		return request(app)
			.get('/map')
			.then(function(response){
				assert.equal(response.status, 200);
			});
	});

	it('should return a map on rendering', function() {
		//Test that GET /map route renders the map page
		return request(app)
			.get('/map')
			.then(function(response){
				expect(response.text).to.contain('Map');
			});
	});
});

describe('Unit testing the /home route', function() {

	it('should return FORBIDDEN status when user is not logged in', function() {
		//Test that  the /home page cannot be accessed by unauthorized users
		return request(app)
			.get('/home')
			.then(function(response){
				assert.equal(response.status, 403);
			});
	});

	it('should return an error when a city/place to search is not entered', (done) => {
		//Test that the /home search feature cannot be used without search data
		const  data = {
			search: ''
		};
		request(app)
			.post('/home')
			.send(data)
			.end((err, response) => { 
				expect(response).to.exist;
				expect(response).have.property('text')
					.to.contain('Please enter a Place Name or address to search!');
				done();
			});
	});
});

describe('Unit testing the /passtimes route ', function() {

	it('should return FORBIDDEN status when user is not logged in', function() {
		//Test that a user who is not logged in cannot view /passtimes
		return request(app)
			.get('/passtimes')
			.then(function(response){
				assert.equal(response.status, 403);
			});
	});
});

describe('Unit testing the /logout route', function() {

	it('should return REDIRECTION status', function() {
		//Test that GET /logout route returns a status code of 302
		return request(app)
			.get('/logout')
			.then(function(response){
				assert.equal(response.status, 302);
			});
	});

});

describe('Unit testing the /about route', function() {

	it('should return OK status', function() {
		//Test that GET /about route returns a status code of 200
		return request(app)
			.get('/about')
			.then(function(response){
				assert.equal(response.status, 200);
			});
	});

	it('should return about text on rendering', function() {
		//Test that GET /about route renders the about text
		return request(app)
			.get('/about')
			.then(function(response){
				expect(response.text).to.contain('About ISS Locator');
			});
	});
});

describe('Unit testing a route that does not exist', function() {

	it('should return NOT-FOUND status', function() {
		//Test that GET a route that does not exist returns a status code of 404 
		return request(app)
			.get('/notfound')
			.then(function(response){
				assert.equal(response.status, 404);
			});
	});
});

describe('Unit testing the /register route for POST ', function() {
    
	it('should return a BAD-REQUEST status', function() {
		//Test that POST /register route with incomplete data returns a status code of 400
		const data = {email: 'v@g.com',
			city: 'krk',
			password: 'Vhyg33k'};
		return request(app)
			.post('/register')
			.send(data)
			.then(function(response) {
				assert.equal(response.status, 400);
			});
	});

	it('should Register a user successfully and redirect to /home', (done) => {
		//Test successful user registration
		const  userData = {
			name: 'Aoka',
			email:'user1@gmail.com',
			city:'nbo',
			password:'Vaoka123',
			confirmPassword:'Vaoka123'
		};
		request(app)
			.post('/register')
			.send(userData)
			.end((response) => { 
				response.should.have.status(302); 
			})
			.finally(done()
			);
	});

	it('should return an error when the passwords do not match', (done) => {
		//Test /POST register with passwords that do not match
		const  userData = {
			name: 'Aoka',
			email:'user1@gmail.com',
			city:'nbo',
			password:'Vaoka123',
			confirmPassword:'V123'
		};
		request(app)
			.post('/register')
			.send(userData)
			.end((err, response) => { 
				expect(response).to.exist;
				expect(response).have.property('text')
					.to.contain('The passwords do not match!');
				done();
			});
	});       
});
