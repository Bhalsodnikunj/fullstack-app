// models/Item.js
const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Item', itemSchema);
