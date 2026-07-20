

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Createurs = require('../models/Createurs')
const Marques = require('../models/Marques')

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    let utilisateur

    if (role === 'createur') {
      utilisateur = await Createurs.findOne({ email })
    } else if (role === 'marque') {
      utilisateur = await Marques.findOne({ email })
    } else {
      return res.status(400).json({ message: 'Le rôle doit être "createur" ou "marque"' })
    }

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    const motDePasseValide = await bcrypt.compare(password, utilisateur.password)

    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Mot de passe incorrect' })
    }

    const token = jwt.sign(
      { id: utilisateur._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      utilisateur: {
        id: utilisateur._id,
        fullname: utilisateur.fullname,
        username: utilisateur.username,
        email: utilisateur.email,
        role: role
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const monProfil = async (req, res) => {
  try {
    const { id, role } = req.utilisateur

    let utilisateur

    if (role === 'createur') {
      utilisateur = await Createurs.findById(id).select('-password')
    } else if (role === 'marque') {
      utilisateur = await Marques.findById(id).select('-password')
    } else {
      return res.status(400).json({ message: 'Rôle invalide' })
    }

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    res.status(200).json({ ...utilisateur.toObject(), role })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { login, monProfil }