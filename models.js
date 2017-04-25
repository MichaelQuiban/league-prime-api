const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User information, a username, and password.
const loginSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true}, 
	password: { type: String, required: true}
})

//Champion Tracking Data
const championSchema = mongoose.Schema({
	name: {type: String, required: true, unique: true}, //Champion Name
	build: {type: String}, //Champion build type: ADC, APC, Jungle
	lane: {type: String, required: true}, //Which lane did you play in?
	wins: {type: String, required: true}, //How many wins does this champion have?
	loss: {type: String, required: true}, //How many losses does this champion have?
	rank: {type: Boolean}, //Are you playing ranked?
	damage: {type: String}, //How much damage did you do?
	kills: {type: String}, //How many kills do you have?
	deaths: {type: String} //How many deaths do you have?
})

//Ranked Tracking Data
const rankedSchema = mongoose.Schema({
	ranking: {type: String, required: true}, //Curent total rank symbol. (Silver, gold, diamond)
	role: {type: String, required: true}, //Current ranked role (Support, ADC, APC)
	elo: {type: String, required: true}, //Ranking score (Total ELO score)
	progress: {type: Boolean, required: true} //Did you win? Yes or no?
})

//Create a model using the schema data.
const Login = mongoose.model('Login', loginSchema);
const Champion = mongoose.model('Champion', championSchema;
const Ranked = mongoose.model('Ranked', rankedSchema);

//Make this available to our users in the League-Prime-Api
module.exports = {Login, Champion, Ranked};