const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	city: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

// Authenticate login input against db
UserSchema.statics.authenticate = function(email, password, callback){
	//query for user with the email address
	User.findOne({email: email})
		.exec(function(error, user){
			if(error){
				return callback(error);
			}else if(!user){
				const err = new Error('User not found');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function(error, result){
				if(result === true){
					return callback(null, user);
				}else{
					return callback();
				}
			});
		});
};

//Check for duplicate emails before saving
UserSchema.pre('save', function(next){
	const user = this;
	User.findOne({email : user.email}, 'email', function(err, results) {
		if(err) {
			next(err);
		} else if(results) {
			user.invalidate('email', `A user with the email ${user.email} already exists!`);
			next(new Error(`A user with the email ${user.email} already exists!`));
		} else {
			next();
		}
	});
});

//Hash password before saving 
UserSchema.pre('save', function(next){
	const user = this;
	if(
		/[a-z]/.test(user.password) && 
      /[A-Z]/.test(user.password) && 
      /[0-9]/g.test(user.password) && 
      /\w{6,}/.test(user.password) === true){
		bcrypt.hash(user.password, 10, function(err, hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	}else{
		const err = new Error('Ensure the password is atleast 6 characters long and it contains Numbers, UpperCase and LowerCase letters!');
		err.status = 400;
		return next(err);
	}

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
