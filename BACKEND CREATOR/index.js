

require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectDB = require('./Config/Db')

const createursRoutes = require('./routes/CreateursRoute')
const marquesRoutes = require('./routes/MarqueRoute')
const authRoutes = require('./routes/AuthRoute')
const campagnesRoutes = require('./routes/CampagnesRoute')
const dashboardRoutes = require('./routes/DashboardRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/createurs', createursRoutes)
app.use('/api/marques', marquesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/campagnes', campagnesRoutes)
app.use('/api/dashboard', dashboardRoutes)

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})