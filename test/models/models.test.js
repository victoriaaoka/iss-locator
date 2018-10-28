
const expect = require('chai').expect;
const User = require('../../models/user');
const mongoose = require('mongoose');


describe('Test the user model', function() {

    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
          console.log('Connected to test database!');
          done();
        });
      });

    it('should be invalid if any field is empty', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            expect(err.errors.name).to.exist;
            expect(err.errors.city).to.exist;
            expect(err.errors.password).to.exist;
            done();
        });
    });


    it('should save a new user successfully', function(done) {
        const  userData = {
            name: 'Aoka',
            email:'user1@gmail.com',
            city:'nbo',
            password:'Vaoka123' 
        }
        const user = new User(userData);
        user.save(function() {
          expect(user).to.exist
            .and.be.instanceof(User);
            expect(user).have.property('name', 'Aoka');
            expect(user).have.property('email', 'user1@gmail.com');
            expect(user).have.property('city', 'nbo');
          done();
        });
    });

    it('should ensure that all fields have been filled', function(done) {
        //Saving a user without an email value
        const  userData = {
            name: 'Aoka',
            email:'',
            city:'nbo',
            password:'Va12' 
        }
        const user = new User(userData);
        user.save((err) => {
            expect(err).to.exist
            .and.be.instanceof(Error);
            console.log(err);
            expect(err).have.property('_message', 'User validation failed');
            done();
        });
    });

    it('should not save duplicate emails', function(done) {
        //Saving a user wu=ith the email: user1@gmail.com again
        const  userData = {
            name: 'Aoka',
            email:'user1@gmail.com',
            city:'nbo',
            password:'Vaoka123' 
        }
        const user = new User(userData);
        user.save((err) => {
          expect(err).to.exist
            .and.be.instanceof(Error);
            expect(err).have.property('message', 'A user with the email user1@gmail.com already exists!');
          done();
        });
    });

    it('should hash the saved passwords', function(done) {
        const  userData = {
            name: 'Aoka',
            email:'userwahash@gmail.com',
            city:'nbo',
            password:'Vaoka123' 
        }
        const user = new User(userData);
        user.save(function() {
          expect(user).to.exist
            .and.be.instanceof(User);
            expect(user).have.property('password')
            .to.not.equal('Vaoka123');
          done();
        });
    });

    it('should ensure the password contains more than 6 characters', function(done) {
        //Saving a user with the password: Va12
        const  userData = {
            name: 'Aoka',
            email:'userwapword@gmail.com',
            city:'nbo',
            password:'Va12' 
        }
        const user = new User(userData);
        user.save((err) => {
            expect(err).to.exist
            .and.be.instanceof(Error);
            expect(err).have.property('message', 'Ensure the password is atleast 6 characters long and it contains Numbers, UpperCase and LowerCase letters!');
            done();
        });
    });

    it('should ensure the password contains atleast one UpperCase letter', function(done) {
        //Saving a user with the password: va123f
        const  userData = {
            name: 'Aoka',
            email:'userwapword@gmail.com',
            city:'nbo',
            password:'va123f' 
        }
        const user = new User(userData);
        user.save((err) => {
            expect(err).to.exist
            .and.be.instanceof(Error);
            expect(err).have.property('message', 'Ensure the password is atleast 6 characters long and it contains Numbers, UpperCase and LowerCase letters!');
            done();
        });
    });

    it('should ensure the password contains atleast one LowerCase letter', function(done) {
        //Saving a user wu=ith the email: user1@gmail.com again
        const  userData = {
            name: 'Aoka',
            email:'userwapword@gmail.com',
            city:'nbo',
            password:'va123f' 
        }
        const user = new User(userData);
        user.save((err) => {
            expect(err).to.exist
            .and.be.instanceof(Error);
            expect(err).have.property('message', 'Ensure the password is atleast 6 characters long and it contains Numbers, UpperCase and LowerCase letters!');
            done();
        });
    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

});