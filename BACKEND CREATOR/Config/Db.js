const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connexion à MongoDB réussie')
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message)
    process.exit(1)
  }
}

module.exports = connectDB