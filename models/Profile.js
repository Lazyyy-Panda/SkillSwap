const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: '' },
  skillsOffer: [{ type: String, required: true }],
  interests: [{ type: String, required: true }],
  skillsLearn: [{ type: String, required: true }]
});

module.exports = mongoose.model('Profile', profileSchema);