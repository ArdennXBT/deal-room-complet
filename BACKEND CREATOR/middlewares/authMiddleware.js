

const jwt = require('jsonwebtoken')

const verifierToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Aucun token fourni' })
    }

    const token = authHeader.split(' ')[1]

    const donneesDecodees = jwt.verify(token, process.env.JWT_SECRET)

    req.utilisateur = donneesDecodees

    next()

  } catch (error) {
    return res.status(403).json({ message: 'Token invalide ou expiré' })
  }
}

module.exports = verifierToken