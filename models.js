const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

//User information, a username, and password.
const UserSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true}, 
	password: { type: String, required: true},
	ranking: {type: Number}, //Curent total rank symbol. (Silver, gold, diamond)
	elo: {type: Number}, //Ranking score (Total ELO score)
	role: {type: String}, //Current ranked role (Support, ADC, APC)
	progress: {type: Boolean} //Did you win? Yes or no?
});

//Hash passwords using bcryptjs
UserSchema.methods.validatePassword = function(password) {
	return bcrypt
	.compare(password, this.password)
	.then(isValid => isValid);
}

UserSchema.methods.hashPassword = function(password){
	return bcrypt
	.has(password, 10)
	.then(hash => hash);
}

//Champion Tracking Data
const championSchema = mongoose.Schema({
	username: {type: String, required: true},
	name: {type: String, required: true, unique: true}, //Champion Name
	lane: {type: String, required: true}, //Which lane did you play in?
	wins: {type: Number, required: true}, //How many wins does this champion have?
	loss: {type: Number, required: true}, //How many losses does this champion have?
	build: {type: String}, //Champion build type: ADC, APC, Jungle
	kills: {type: Number}, //How many kills do you have?
	deaths: {type: Number}, //How many deaths do you have?
	damage: {type: Number} //How much damage did you do?
});


//Create a model using the schema data.
const User = mongoose.model('User', UserSchema);
const Champion = mongoose.model('Champion', championSchema);

//Make this available to our users in the League-Prime-Api
module.exports = {User, Champion};