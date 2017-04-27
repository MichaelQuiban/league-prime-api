const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User information, a username, and password.
const userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true}, 
	password: { type: String, required: true},
	ranking: {type: Number, required: true}, //Curent total rank symbol. (Silver, gold, diamond)
	elo: {type: Number, required: true}, //Ranking score (Total ELO score)
	role: {type: String, required: true}, //Current ranked role (Support, ADC, APC)
	progress: {type: Boolean, required: true} //Did you win? Yes or no?
})

//Champion Tracking Data
const championSchema = mongoose.Schema({
	username: {type: String, required: true},
	name: {type: String, required: true, unique: true}, //Champion Name
	lane: {type: String, required: true}, //Which lane did you play in?
	wins: {type: Number, required: true}, //How many wins does this champion have?
	loss: {type: Number, required: true}, //How many losses does this champion have?
	build: {type: String}, //Champion build type: ADC, APC, Jungle
	kills: {type: Number}, //How many kills do you have?
	deaths: {type: Number} //How many deaths do you have?
	damage: {type: Number}, //How much damage did you do?
})

//Create a model using the schema data.
const User = mongoose.model('User', userSchema);
const Champion = mongoose.model('Champion', championSchema;

//Make this available to our users in the League-Prime-Api
module.exports = {User, Champion};