

import './Profil.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profil() {
  const [profil, setProfil] = useState(null)
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const chargerProfil = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/connexion')
        return
      }

      try {
        const reponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await reponse.json()

        if (!reponse.ok) {
          setErreur(data.message || 'Impossible de charger le profil')
          setChargement(false)
          return
        }

        setProfil(data)
        setChargement(false)

      } catch (error) {
        console.error('Erreur chargement profil :', error)
        setErreur('Impossible de contacter le serveur')
        setChargement(false)
      }
    }

    chargerProfil()
  }, [navigate])

  if (chargement) {
    return <div className="profil-page"><p className="profil-chargement">Chargement...</p></div>
  }

  if (erreur) {
    return <div className="profil-page"><p className="erreur-message">{erreur}</p></div>
  }

  const initiale = profil.username ? profil.username.charAt(0).toUpperCase() : '?'

  return (
    <div className="profil-page">
      <div className="profil-header">
        <div className="profil-avatar">
          {profil.avatarUrl ? <img src={profil.avatarUrl} alt={profil.username} /> : initiale}
        </div>
        <div className="profil-identite">
          <h1>{profil.fullname}</h1>
          <span className="profil-username">@{profil.username}</span>
          <br />
          <span className="profil-role">{profil.role === 'createur' ? 'Créateur' : 'Marque'}</span>
        </div>
      </div>

      <div className="profil-infos">
        <div className="profil-champ">
          <span>Email</span>
          <span>{profil.email}</span>
        </div>
        {profil.biographie && (
          <div className="profil-champ">
            <span>Bio</span>
            <span>{profil.biographie}</span>
          </div>
        )}
        {profil.localisation && (
          <div className="profil-champ">
            <span>Localisation</span>
            <span>{profil.localisation}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profil