const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  quantity: { type: String, required: true },
  upccode: { type: String, required: true },
  location: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  time: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Place', placeSchema);
