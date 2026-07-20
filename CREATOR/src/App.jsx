

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Accueil from './Pages/Accueil'
import Createurs from './Pages/Createurs'
import Campagnes from './Pages/Campagnes'
import Dashboard from './Pages/Dashboard'
import Inscription from './Pages/Inscription'
import Connexion from './Pages/Connexion'
import Profil from './Pages/Profil'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/createurs" element={<Createurs />} />
        <Route path="/campagnes" element={<Campagnes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App