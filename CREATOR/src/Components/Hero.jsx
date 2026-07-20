

import './Hero.css'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero-badge">✦ Plateforme de collaboration créateurs</div>

      <h1>
        Trouvez les créateurs parfaits <span>pour votre marque</span>
      </h1>

      <p className="hero-subtitle">
        Découvrez, filtrez et collaborez avec des créateurs de contenu
        selon leur niche et leur audience. Testez vos campagnes avant de vous engager.
      </p>

      <div className="hero-actions">
        <Button texte="Essayer gratuitement" variante="primary" onClick={() => navigate('/inscription')} />
        <Button texte="Connexion" variante="secondary" onClick={() => navigate('/connexion')} />
      </div>

      <p className="hero-note">Essai gratuit de 14 jours · Sans engagement</p>

      <div className="hero-trust">
        Une solution pensée pour les équipes marketing et les agences.
        Validez votre stratégie avant tout engagement financier.
        Rejoignez les marques qui optimisent déjà leurs collaborations avec des créateurs vérifiés.
      </div>
    </section>
  )
}
export default Hero