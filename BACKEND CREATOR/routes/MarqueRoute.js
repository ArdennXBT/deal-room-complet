

const verifierToken = require('../middlewares/authMiddleware')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Marques = require('../models/Marques')

// Créer une marque (inscription) - PUBLIC
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const nouvelleMarque = new Marques({
      ...req.body,
      password: hashedPassword
    })

    const marqueEnregistree = await nouvelleMarque.save()
    res.status(201).json(marqueEnregistree)
  } catch (error) {
    if (error.code === 11000) {
      const champ = Object.keys(error.keyPattern)[0]
      return res.status(400).json({ message: `Ce ${champ} est déjà utilisé` })
    }
    res.status(400).json({ message: error.message })
  }
})

// Récupérer toutes les marques - PUBLIC
router.get('/', async (req, res) => {
  try {
    const marques = await Marques.find()
    res.status(200).json(marques)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Récupérer une marque par son ID - PUBLIC
router.get('/:id', async (req, res) => {
  try {
    const marque = await Marques.findById(req.params.id)
    if (!marque) {
      return res.status(404).json({ message: 'Marque introuvable' })
    }
    res.status(200).json(marque)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Modifier une marque - PROTÉGÉ
router.put('/:id', verifierToken, async (req, res) => {
  try {
    const marqueModifiee = await Marques.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!marqueModifiee) {
      return res.status(404).json({ message: 'Marque introuvable' })
    }
    res.status(200).json(marqueModifiee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Supprimer une marque - PROTÉGÉ
router.delete('/:id', verifierToken, async (req, res) => {
  try {
    const marqueSupprimee = await Marques.findByIdAndDelete(req.params.id)
    if (!marqueSupprimee) {
      return res.status(404).json({ message: 'Marque introuvable' })
    }
    res.status(200).json({ message: 'Marque supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router