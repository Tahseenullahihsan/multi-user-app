const mongoose = require('mongoose');

// Define the schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

// Create a model for User based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
