const mongoose = require('mongoose')

const userDashboard = new mongoose.Schema({
  marquesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marques',
    required: true
  },
  allcreators: { type: Number, default: 0 },
  allcampaigns: { type: Number, default: 0 },
  allbudget: { type: Number, default: 0 },
  averageengagement: { type: Number, default: 0 },
  averageviews: { type: Number, default: 0 }

}, { timestamps: true })

module.exports = mongoose.model('Dashboard', userDashboard)