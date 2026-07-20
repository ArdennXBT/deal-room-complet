

const express = require('express')
const router = express.Router()

const verifierToken = require('../middlewares/authMiddleware')
const verifierProprietaireCampagne = require('../middlewares/CampagnesMid')
const Campagnes = require('../models/Campagnes')

// Créer une campagne - PROTÉGÉ (marque uniquement)
router.post('/', verifierToken, async (req, res) => {
  try {
    if (req.utilisateur.role !== 'marque') {
      return res.status(403).json({ message: 'Seule une marque peut créer une campagne' })
    }

    const nouvelleCampagne = new Campagnes({
      ...req.body,
      marquesId: req.utilisateur.id
    })

    const campagneEnregistree = await nouvelleCampagne.save()
    res.status(201).json(campagneEnregistree)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Lister toutes les campagnes - PUBLIC
router.get('/', async (req, res) => {
  try {
    const campagnes = await Campagnes.find()
      .populate('marquesId', 'fullname')
      .sort({ createdAt: -1 })
    res.status(200).json(campagnes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Voir le détail d'une campagne - PUBLIC
router.get('/:id', async (req, res) => {
  try {
    const campagne = await Campagnes.findById(req.params.id)
      .populate('marquesId', 'fullname')
      .populate('createursId', 'fullname username')
      .populate('candidatures.createurId', 'fullname username')

    if (!campagne) {
      return res.status(404).json({ message: 'Campagne introuvable' })
    }
    res.status(200).json(campagne)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Modifier une campagne - PROTÉGÉ (propriétaire uniquement)
router.put('/:id', verifierToken, verifierProprietaireCampagne, async (req, res) => {
  try {
    const campagneModifiee = await Campagnes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.status(200).json(campagneModifiee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Supprimer une campagne - PROTÉGÉ (propriétaire uniquement)
router.delete('/:id', verifierToken, verifierProprietaireCampagne, async (req, res) => {
  try {
    await Campagnes.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Campagne supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Postuler à une campagne - PROTÉGÉ (créateur uniquement)
router.post('/:id/postuler', verifierToken, async (req, res) => {
  try {
    if (req.utilisateur.role !== 'createur') {
      return res.status(403).json({ message: 'Seul un créateur peut postuler' })
    }

    const campagne = await Campagnes.findById(req.params.id)

    if (!campagne) {
      return res.status(404).json({ message: 'Campagne introuvable' })
    }

    const dejaPostule = campagne.candidatures.some(
      c => c.createurId.toString() === req.utilisateur.id
    )

    if (dejaPostule) {
      return res.status(400).json({ message: 'Vous avez déjà postulé à cette campagne' })
    }

    campagne.candidatures.push({ createurId: req.utilisateur.id })
    await campagne.save()

    res.status(200).json({ message: 'Candidature envoyée avec succès' })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Valider ou refuser une candidature - PROTÉGÉ (propriétaire uniquement)
router.put('/:id/candidature/:createurId', verifierToken, verifierProprietaireCampagne, async (req, res) => {
  try {
    const { statut } = req.body

    if (!['acceptee', 'refusee'].includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide' })
    }

    const campagne = req.campagne

    const candidature = campagne.candidatures.find(
      c => c.createurId.toString() === req.params.createurId
    )

    if (!candidature) {
      return res.status(404).json({ message: 'Candidature introuvable' })
    }

    candidature.statut = statut

    if (statut === 'acceptee') {
      const dejaValide = campagne.createursId.some(
        id => id.toString() === req.params.createurId
      )
      if (!dejaValide) {
        campagne.createursId.push(req.params.createurId)
      }
    }

    await campagne.save()
    res.status(200).json({ message: `Candidature ${statut}`, campagne })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router