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

});

describe('Unit testing the /about route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/about')
        .then(function(response){
            assert.equal(response.status, 200)
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

});

describe('Unit testing the /register route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/register')
        .then(function(response){
            assert.equal(response.status, 200)
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
