

const verifierToken = require('../middlewares/authMiddleware')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Createurs = require('../models/Createurs')

// Créer un créateur (inscription) - PUBLIC
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const nouveauCreateur = new Createurs({
      ...req.body,
      password: hashedPassword
    })

    const createurEnregistre = await nouveauCreateur.save()
    res.status(201).json(createurEnregistre)
  } catch (error) {
    if (error.code === 11000) {
      const champ = Object.keys(error.keyPattern)[0]
      return res.status(400).json({ message: `Ce ${champ} est déjà utilisé` })
    }
    res.status(400).json({ message: error.message })
  }
})

// Récupérer tous les créateurs - PUBLIC
router.get('/', async (req, res) => {
  try {
    const createurs = await Createurs.find()
    res.status(200).json(createurs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Récupérer un créateur par son ID - PUBLIC
router.get('/:id', async (req, res) => {
  try {
    const createur = await Createurs.findById(req.params.id)
    if (!createur) {
      return res.status(404).json({ message: 'Créateur introuvable' })
    }
    res.status(200).json(createur)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Modifier un créateur - PROTÉGÉ
router.put('/:id', verifierToken, async (req, res) => {
  try {
    const createurModifie = await Createurs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!createurModifie) {
      return res.status(404).json({ message: 'Créateur introuvable' })
    }
    res.status(200).json(createurModifie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Supprimer un créateur - PROTÉGÉ
router.delete('/:id', verifierToken, async (req, res) => {
  try {
    const createurSupprime = await Createurs.findByIdAndDelete(req.params.id)
    if (!createurSupprime) {
      return res.status(404).json({ message: 'Créateur introuvable' })
    }
    res.status(200).json({ message: 'Créateur supprimé avec succès' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router