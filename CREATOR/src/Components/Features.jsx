

import './Features.css'
import { useEffect, useRef, useState } from 'react'
import img1 from '../assets/feature-1-profils.svg'
import img2 from '../assets/feature-2-campagnes.svg'
import img3 from '../assets/feature-3-dashboard.svg'
import img4 from '../assets/feature-4-recherche.svg'

const FEATURES = [
  {
    titre: "Gérez vos collaborations comme un pro",
    points: [
      { titre: "Profils vérifiés", desc: "Accédez aux statistiques d'audience et d'engagement de chaque créateur en un coup d'œil." },
      { titre: "Filtres puissants", desc: "Filtrez par niche, nombre d'abonnés et taux d'engagement facilement." },
    ],
    image: "left",
    imageUrl: img1,
  },
  {
    titre: "Créez des campagnes en quelques clics",
    points: [
      { titre: "Campagnes fictives", desc: "Simulez vos campagnes avant tout engagement financier réel." },
      { titre: "Association facile", desc: "Associez des créateurs à vos campagnes en un seul clic." },
    ],
    image: "right",
    imageUrl: img2,
  },
  {
    titre: "Suivez vos performances en temps réel",
    points: [
      { titre: "Dashboard complet", desc: "Toutes vos métriques au même endroit, claires et accessibles." },
      { titre: "Statistiques détaillées", desc: "Analysez l'impact de chaque collaboration sur votre marque." },
    ],
    image: "left",
    imageUrl: img3,
  },
  {
    titre: "Trouvez le créateur idéal rapidement",
    points: [
      { titre: "Recherche avancée", desc: "Cherchez par niche, plateforme, localisation et bien plus." },
      { titre: "Profils complets", desc: "Chaque créateur a une fiche détaillée avec son audience et ses stats." },
    ],
    image: "right",
    imageUrl: img4,
  },
]

function FeatureBlock({ data }) {
  const isLeft = data.image === "left"
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`feature-block ${isLeft ? "image-left" : "image-right"} ${visible ? "is-visible" : ""}`}
    >
      <div className="feature-block-image">
        <img src={data.imageUrl} alt={data.titre} className="feature-image" />
      </div>

      <div className="feature-block-text">
        <h2>{data.titre}</h2>
        <div className="features-points">
          {data.points.map((point, i) => (
            <div className="features-point" key={i} style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
              <span className="check"></span>
              <div>
                <strong>{point.titre}</strong>
                <p>{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Features() {
  return (
    <section className="features-section">
      {FEATURES.map((feat, index) => (
        <FeatureBlock key={index} data={feat} />
      ))}
    </section>
  )
}

export default Features