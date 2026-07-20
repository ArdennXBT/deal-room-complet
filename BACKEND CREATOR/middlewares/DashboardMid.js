

const verifierRoleMarque = (req, res, next) => {
  if (req.utilisateur.role !== 'marque') {
    return res.status(403).json({ message: 'Le dashboard est réservé aux marques' })
  }
  next()
}

module.exports = verifierRoleMarque