const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:    { type: String, unique: true, required: true },
  passwordHash:{ type: String, required: true },
  role:        { type: String, enum: ['Gerente','Supervisor','Cliente'], required: true },
  sector:      { type: String, default: null }
}, { collection: 'usuarios' });

module.exports = mongoose.model('User', userSchema);
