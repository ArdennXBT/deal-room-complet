

import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSyncExternalStore } from 'react'
import Button from './Button'

const LIENS_NAV = [
  { nom: "Accueil",   lien: "/",           publique: true  },
  { nom: "Créateurs", lien: "/createurs",  publique: false },
  { nom: "Campagnes", lien: "/campagnes",  publique: false },
  { nom: "Dashboard", lien: "/dashboard",  publique: false },
]

function getUtilisateurSnapshot() {
  return localStorage.getItem('utilisateur')
}

function subscribe(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('utilisateur-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('utilisateur-change', callback)
  }
}

function Navbar() {
  const navigate = useNavigate()
  const utilisateurStocke = useSyncExternalStore(subscribe, getUtilisateurSnapshot)
  const utilisateur = utilisateurStocke ? JSON.parse(utilisateurStocke) : null

  const handleDeconnexion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    window.dispatchEvent(new Event('utilisateur-change'))
    navigate('/')
  }

  const liensAffiches = LIENS_NAV.filter(item => item.publique || utilisateur)

  return (
    <nav>
      <Link to="/" className="logo">Creator Deal Room</Link>
      <ul>
        {liensAffiches.map((item, index) => (
          <li key={index}>
            <Link to={item.lien}>{item.nom}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        {utilisateur ? (
          <>
            <Link to="/profil" className="nav-username">@{utilisateur.username}</Link>
            <Button texte="Déconnexion" variante="secondary" onClick={handleDeconnexion} />
          </>
        ) : (
          <>
            <Button texte="Connexion" variante="secondary" onClick={() => navigate('/connexion')} />
            <Button texte="Essayer gratuitement" variante="primary" onClick={() => navigate('/inscription')} />
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar