

import './Connexion.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Connexion() {
  const [role, setRole] = useState('createur')
  const [formData, setFormData] = useState({
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

    try {
      const reponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, role })
      })

      const data = await reponse.json()

      if (!reponse.ok) {
        setErreur(data.message || 'Une erreur est survenue')
        setChargement(false)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur))
      window.dispatchEvent(new Event('utilisateur-change'))

      navigate('/')

    } catch (error) {
      console.error('Erreur connexion :', error)
      setErreur('Impossible de contacter le serveur')
      setChargement(false)
    }
  }

  return (
    <div className="connexion-page">
      <h1>Se connecter</h1>

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
          {chargement ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

export default Connexion