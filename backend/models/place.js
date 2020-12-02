const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  quantity: { type: String, required: true },
  upccode: { type: String, required: true },
  location: { type: String, required: true },
  creator: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Place', placeSchema);
