

import './Footer.css'


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <span className="logo">Creator Deal Room</span>
          <p>La plateforme qui connecte les marques aux meilleurs créateurs de contenu.</p>
        </div>

        <div className="footer-liens">
          <div className="footer-col">
            <h4>Produit</h4>
            <a href="#">Créateurs</a>
            <a href="#">Campagnes</a>
            <a href="#">Dashboard</a>
            <a href="#">Tarifs</a>
          </div>

          <div className="footer-col">
            <h4>Entreprise</h4>
            <a href="#">À propos</a>
            <a href="#">Blog</a>
            <a href="#">Carrières</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Légal</h4>
            <a href="#">Confidentialité</a>
            <a href="#">Conditions</a>
            <a href="#">Cookies</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Creator Deal Room. Tous droits réservés.</p>
        <div className="footer-socials">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer