

const mongoose = require('mongoose')

const userMarques = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 20
  },
  avatarUrl: { type: String, default: '' },
  localisation: { type: String, default: '' },
  phonenumber: { type: String },
  secteur: { type: String },

  campagnesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campagnes'
  }]

}, { timestamps: true })

module.exports = mongoose.model('Marques', userMarques)