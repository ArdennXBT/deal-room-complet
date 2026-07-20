

const mongoose = require('mongoose')

const userCampagnes = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  budget: { type: Number, required: true },
  status: {
    type: String,
    enum: ['active', 'terminee', 'suspendu'],
    default: 'active'
  },
  startdate: { type: Date },
  enddate: { type: Date },

  marquesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marques',
    required: true
  },

  createursId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'createurs'
  }],

  candidatures: [{
    createurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'createurs',
      required: true
    },
    statut: {
      type: String,
      enum: ['en_attente', 'acceptee', 'refusee'],
      default: 'en_attente'
    },
    datePostulation: { type: Date, default: Date.now }
  }]

}, { timestamps: true })

module.exports = mongoose.model('Campagnes', userCampagnes)