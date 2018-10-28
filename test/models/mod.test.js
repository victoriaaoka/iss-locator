// const assert = require('assert');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const chai = require('chai');
// const expect = chai.expect;

// // Create a new schema that accepts a 'user' object.
// const testSchema = new mongoose.Schema({
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     city: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     password: {
//       type: String,
//       required: true
//     }
//   });
// //Create a new collection called 'Users'
// const Users = mongoose.model('Users', testSchema);

// describe('Database Tests', function() {
//   //Before starting the test, create a sandboxed database connection
//   //Once a connection is established invoke done()
//   before(function (done) {
//     mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true });
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error'));
//     db.once('open', function() {
//       console.log('Connected to test database!');
//       done();
//     });
//   });

//     describe('Test Database', function() {
//         //Save a new user"
//         it('should register a new user to test database', function(done) {
//             const  userData = {
//                 name: 'Aoka',
//                 email:'aoka@gmail.com',
//                 city:'nbo',
//                 password:'Vicky123'
//             }
//             const user = new Users(userData);
//             user.save(done);
//         });

//         it('should not register user with duplicate emails', function(done) {
//             const  dupUserData = {
//                 name: 'Aoka',
//                 email:'aoka@gmail.com',
//                 city:'nbo',
//                 password:'Vicky123'
//             }
//             const user = new Users(dupUserData);
//             user.validate(function(err) {
//                 expect(err.errors.email).to.exist;
//                 done();
//             });
//         });

//     });
//     after(function(done){
//         mongoose.connection.db.dropDatabase(function(){
//             mongoose.connection.close(done);
//         });
//     });
// });
