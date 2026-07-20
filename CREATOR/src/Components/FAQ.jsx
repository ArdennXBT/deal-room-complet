

import './FAQ.css'
import { useState, useEffect, useRef } from 'react'

const FAQ_DATA = [
  {
    question: `Qu'est-ce que Creator Deal Room ?`,
    reponse: `Creator Deal Room est une plateforme SaaS qui permet aux marques de trouver, filtrer et collaborer avec des createurs de contenu. Gerez vos campagnes depuis un seul endroit.`
  },
  {
    question: `Comment trouver le bon createur pour ma marque ?`,
    reponse: `Utilisez nos filtres avances pour chercher par niche, nombre d'abonnes, taux d'engagement ou plateforme. Chaque createur a un profil complet avec ses statistiques.`
  },
  {
    question: `Est-ce que je peux tester avant de m'engager ?`,
    reponse: `Oui ! Vous pouvez creer des campagnes fictives et simuler des collaborations sans aucun engagement financier. L'essai gratuit dure 14 jours, sans carte bancaire.`
  },
  {
    question: `Quelles plateformes sont supportees ?`,
    reponse: `Creator Deal Room supporte les createurs Instagram, TikTok, YouTube, Twitter et bien d'autres. Vous pouvez filtrer par plateforme selon vos besoins.`
  },
  {
    question: `Comment fonctionne la creation de campagne ?`,
    reponse: `Creez une campagne en quelques clics, definissez vos objectifs, puis associez les createurs de votre choix. Suivez les performances depuis votre dashboard.`
  },
]

function FaqItem({ question, reponse, index, visible }) {
  const [ouvert, setOuvert] = useState(false)

  return (
    <div
      className={`faq-item ${ouvert ? 'ouvert' : ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={() => setOuvert(!ouvert)}
    >
      <div className="faq-question">
        <span>{question}</span>
        <span className="faq-icone">{ouvert ? '−' : '+'}</span>
      </div>
      <div className="faq-reponse">
        <p>{reponse}</p>
      </div>
    </div>
  )
}

function FAQ() {
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
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="faq-section" ref={ref}>
      <h2 className="faq-titre">Questions frequentes</h2>
      <p className="faq-sous-titre">Tout ce que vous devez savoir sur Creator Deal Room</p>
      <div className="faq-liste">
        {FAQ_DATA.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            reponse={item.reponse}
            index={index}
            visible={visible}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ