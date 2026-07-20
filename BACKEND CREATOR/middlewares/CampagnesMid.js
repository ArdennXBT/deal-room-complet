

const Campagnes = require('../models/Campagnes')

const verifierProprietaireCampagne = async (req, res, next) => {
  try {
    if (req.utilisateur.role !== 'marque') {
      return res.status(403).json({ message: 'Seule une marque peut gérer une campagne' })
    }

    const campagne = await Campagnes.findById(req.params.id)

    if (!campagne) {
      return res.status(404).json({ message: 'Campagne introuvable' })
    }

    if (campagne.marquesId.toString() !== req.utilisateur.id) {
      return res.status(403).json({ message: "Vous n'êtes pas propriétaire de cette campagne" })
    }

    req.campagne = campagne
    next()

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = verifierProprietaireCampagne