

import './Inscription.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Inscription() {
  const [role, setRole] = useState('createur')
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  })
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    setChargement(true)

    const url = role === 'createur'
      ? 'http://localhost:5000/api/createurs'
      : 'http://localhost:5000/api/marques'

    try {
      const reponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await reponse.json()

      if (!reponse.ok) {
        setErreur(data.message || 'Une erreur est survenue')
        setChargement(false)
        return
      }

      navigate('/connexion')

    } catch (error) {
      console.error('Erreur inscription :', error)
      setErreur('Impossible de contacter le serveur')
      setChargement(false)
    }
  }

  return (
    <div className="inscription-page">
      <h1>Créer un compte</h1>

      <div className="role-selecteur">
        <button
          type="button"
          className={role === 'createur' ? 'actif' : ''}
          onClick={() => setRole('createur')}
        >
          Je suis Créateur
        </button>
        <button
          type="button"
          className={role === 'marque' ? 'actif' : ''}
          onClick={() => setRole('marque')}
        >
          Je suis une Marque
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Nom complet</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label>Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          minLength={3}
          maxLength={20}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {erreur && <p className="erreur-message">{erreur}</p>}

        <button type="submit" disabled={chargement}>
          {chargement ? 'Création en cours...' : 'Créer mon compte'}
        </button>
      </form>
    </div>
  )
}

export default Inscription