

const express = require('express')
const router = express.Router()

const verifierToken = require('../middlewares/authMiddleware')
const verifierRoleMarque = require('../middlewares/DashboardMid')
const Campagnes = require('../models/Campagnes')

router.get('/me', verifierToken, verifierRoleMarque, async (req, res) => {
  try {
    const campagnes = await Campagnes.find({ marquesId: req.utilisateur.id })

    const totalCampagnes = campagnes.length
    const campagnesActives = campagnes.filter(c => c.status === 'active').length
    const budgetTotal = campagnes.reduce((somme, c) => somme + c.budget, 0)

    const createursUniques = new Set()
    campagnes.forEach(c => {
      c.createursId.forEach(id => createursUniques.add(id.toString()))
    })

    res.status(200).json({
      totalCampagnes,
      campagnesActives,
      budgetTotal,
      totalCreateurs: createursUniques.size,
      campagnes
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router