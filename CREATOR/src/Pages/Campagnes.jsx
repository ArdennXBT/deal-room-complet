

import './Campagnes.css'
import { useState, useEffect } from 'react'

function Campagnes() {
  const [campagnes, setCampagnes] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [afficherForm, setAfficherForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    startdate: '',
    enddate: ''
  })
  const [erreurForm, setErreurForm] = useState('')
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [messageCandidature, setMessageCandidature] = useState('')

  const utilisateurStocke = localStorage.getItem('utilisateur')
  const utilisateur = utilisateurStocke ? JSON.parse(utilisateurStocke) : null

  const chargerCampagnes = async () => {
    try {
      const reponse = await fetch('http://localhost:5000/api/campagnes')
      const data = await reponse.json()

      if (!reponse.ok) {
        setErreur(data.message || 'Impossible de charger les campagnes')
        setChargement(false)
        return
      }

      setCampagnes(data)
      setChargement(false)

    } catch (error) {
      console.error('Erreur chargement campagnes :', error)
      setErreur('Impossible de contacter le serveur')
      setChargement(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch de données au chargement de la page, cas légitime
    chargerCampagnes()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreerCampagne = async (e) => {
    e.preventDefault()
    setErreurForm('')
    setEnvoiEnCours(true)

    const token = localStorage.getItem('token')

    try {
      const reponse = await fetch('http://localhost:5000/api/campagnes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget)
        })
      })

      const data = await reponse.json()

      if (!reponse.ok) {
        setErreurForm(data.message || 'Une erreur est survenue')
        setEnvoiEnCours(false)
        return
      }

      setFormData({ title: '', description: '', budget: '', startdate: '', enddate: '' })
      setAfficherForm(false)
      setEnvoiEnCours(false)
      chargerCampagnes()

    } catch (error) {
      console.error('Erreur création campagne :', error)
      setErreurForm('Impossible de contacter le serveur')
      setEnvoiEnCours(false)
    }
  }

  const handlePostuler = async (campagneId) => {
    setMessageCandidature('')
    const token = localStorage.getItem('token')

    try {
      const reponse = await fetch(`http://localhost:5000/api/campagnes/${campagneId}/postuler`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await reponse.json()

      if (!reponse.ok) {
        setMessageCandidature(data.message || 'Une erreur est survenue')
        return
      }

      setMessageCandidature('Candidature envoyée avec succès')
      chargerCampagnes()

    } catch (error) {
      console.error('Erreur candidature :', error)
      setMessageCandidature('Impossible de contacter le serveur')
    }
  }

  const aDejaPostule = (campagne) => {
    if (!utilisateur) return false
    return campagne.candidatures.some(
      c => c.createurId === utilisateur.id || c.createurId?._id === utilisateur.id
    )
  }

  return (
    <div className="campagnes-page">
      <section className="campagnes-hero">
        <h1>Là où les marques et les créateurs se rencontrent</h1>
        <p>
          Publiez une campagne ou postulez à celles qui vous correspondent.
          Simple, transparent, et pensé pour des collaborations qui fonctionnent des deux côtés.
        </p>
      </section>

      <div className="campagnes-contenu">
        <div className="campagnes-header">
          <h2>Campagnes disponibles</h2>
          {utilisateur?.role === 'marque' && (
            <button className="btn-primaire" onClick={() => setAfficherForm(!afficherForm)}>
              {afficherForm ? 'Annuler' : '+ Créer une campagne'}
            </button>
          )}
        </div>

        {erreur && <p className="erreur-message">{erreur}</p>}
        {messageCandidature && <p className="info-message">{messageCandidature}</p>}

        {afficherForm && (
          <form className="campagne-form" onSubmit={handleCreerCampagne}>
            <label>Titre</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />

            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} />

            <div className="campagne-form-row">
              <div className="campagne-form-col">
                <label>Budget (€)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} min="0" required />
              </div>
              <div className="campagne-form-col">
                <label>Date de début</label>
                <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
              </div>
              <div className="campagne-form-col">
                <label>Date de fin</label>
                <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} />
              </div>
            </div>

            {erreurForm && <p className="erreur-message">{erreurForm}</p>}

            <button type="submit" className="btn-primaire" disabled={envoiEnCours}>
              {envoiEnCours ? 'Création en cours...' : 'Publier la campagne'}
            </button>
          </form>
        )}

        {chargement ? (
          <p className="campagnes-chargement">Chargement des campagnes...</p>
        ) : (
          <div className="campagnes-grille">
            {campagnes.length === 0 && (
              <p className="campagnes-vide">Aucune campagne pour le moment. Reviens bientôt !</p>
            )}

            {campagnes.map((campagne) => {
              const nbCandidatures = campagne.candidatures?.length || 0
              const nbValides = campagne.createursId?.length || 0
              const initiale = campagne.marquesId?.fullname?.charAt(0).toUpperCase() || '?'

              return (
                <div className="campagne-card" key={campagne._id}>
                  <div className="campagne-card-cover">
                    <span className="campagne-badge">🏆 Campagne {campagne.status}</span>
                    <div className="campagne-avatar">{initiale}</div>
                  </div>

                  <div className="campagne-card-body">
                    <div className="campagne-card-eyebrow">
                      {campagne.marquesId?.fullname ? `Par ${campagne.marquesId.fullname}` : 'Campagne'}
                    </div>
                    <h3>{campagne.title}</h3>

                    {campagne.description && <p className="campagne-description">{campagne.description}</p>}

                    <div className="campagne-stats">
                      <div className="campagne-stat">
                        <strong>{campagne.budget}€</strong>
                        <span>Budget</span>
                      </div>
                      <div className="campagne-stat">
                        <strong>{nbCandidatures}</strong>
                        <span>Candidats</span>
                      </div>
                      <div className="campagne-stat">
                        <strong>{nbValides}</strong>
                        <span>Validés</span>
                      </div>
                    </div>

                    {nbValides > 0 && (
                      <div className="campagne-highlight">
                        🏆 {nbValides} créateur{nbValides > 1 ? 's' : ''} déjà validé{nbValides > 1 ? 's' : ''}
                      </div>
                    )}

                    {utilisateur?.role === 'createur' && (
                      <button
                        className="btn-secondaire"
                        onClick={() => handlePostuler(campagne._id)}
                        disabled={aDejaPostule(campagne)}
                      >
                        {aDejaPostule(campagne) ? '✓ Déjà postulé' : 'Postuler'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Campagnes