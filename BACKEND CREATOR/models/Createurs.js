

const mongoose = require('mongoose')

const userCreateurs = new mongoose.Schema({
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
  contact: { type: String },

  biographie: {
    type: String,
    maxLength: 400
  },
  genre: {
    type: String,
    enum: ['Homme', 'Femme', 'Autre']
  },
  niche: {
    type: String,
    enum: ['Food', 'Beauty', 'Tech']
  },
  platforms: {
    type: String,
    enum: ['Instagram', 'Tik tok', 'x']
  },

  followers: { type: Number, default: 0 },
  engagements: { type: Number, default: 0 },
  views: { type: Number, default: 0 },

  marquesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marques'
  }]

}, { timestamps: true })

module.exports = mongoose.model('Createurs', userCreateurs)