const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Unit testing the /index route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return text on rendering', function() {
        return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('The International Space Station Locator');
        })
    });

});


describe('Unit testing the /login route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/login')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return login on rendering', function() {
        return request(app)
        .get('/login')
        .then(function(response){
            expect(response.text).to.contain('Login');
        })
    });

});

describe('Unit testing the /register route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/register')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return sign-up form on rendering', function() {
        return request(app)
        .get('/register')
        .then(function(response){
            expect(response.text).to.contain('Sign Up');
        })
    });

});

describe('Unit testing the /map route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/map')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return a map on rendering', function() {
        return request(app)
        .get('/map')
        .then(function(response){
            expect(response.text).to.contain('Map');
        })
    });

});

describe('Unit testing the /home route', function() {

    it('should return FORBIDDEN status when user is not logged in', function() {
      return request(app)
        .get('/home')
        .then(function(response){
            assert.equal(response.status, 403)
        })
    });

});

describe('Unit testing the /passtimes route ', function() {

    it('should return FORBIDDEN status when user is not logged in', function() {
      return request(app)
        .get('/passtimes')
        .then(function(response){
            assert.equal(response.status, 403)
        })
    });

});

describe('Unit testing the /logout route', function() {

    it('should return REDIRECTION status', function() {
      return request(app)
        .get('/logout')
        .then(function(response){
            assert.equal(response.status, 302)
        })
    });

});

describe('Unit testing the /about route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/about')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
    it('should return about text on rendering', function() {
        return request(app)
        .get('/about')
        .then(function(response){
            expect(response.text).to.contain('About ISS Locator');
        })
    });
});

describe('Unit testing a route that does not exist', function() {

    it('should return NOT-FOUND status', function() {
      return request(app)
        .get('/notfound')
        .then(function(response){
            assert.equal(response.status, 404)
        })
    });

});

describe('Unit testing the /register route for POST', function() {
    let data = {email: 'v@g.com',
                city: 'krk',
                password: 'Vhyg33k'}
    it('should return a BAD-REQUEST status', function() {
        return request(app)
          .post('/register')
          .send(data)
          .then(function(response) {
            assert.equal(response.status, 400);
          })
      });
});