

import './Button.css'
function Button({ texte, variante = 'primary', onClick }) {
  return (
    <button className={`btn btn-${variante}`} onClick={onClick}>
      {texte}
    </button>
  )
}
export default Button