

import './CTA.css'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function CTA() {
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
    <section className={`cta-section ${visible ? 'is-visible' : ''}`} ref={ref}>
      <h2 className="cta-titre">
        Prêt à trouver vos créateurs idéaux ?
      </h2>
      <p className="cta-sous-titre">
        Rejoignez les marques qui optimisent déjà leurs collaborations.
        Lancez-vous gratuitement, sans engagement.
      </p>
      <div className="cta-actions">
        <Link to="/inscription" className="btn btn-primary">Essayer gratuitement pendant 14 jours</Link>
        <Link to="/inscription" className="btn btn-secondary">Voir une démo</Link>
      </div>
      <p className="cta-note">Sans carte bancaire · Annulation à tout moment</p>
    </section>
  )
}

export default CTA