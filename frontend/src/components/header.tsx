import style from '../css/header.module.css'

function Header() {
  return (
    <div className={style.banner_wrapper}>
        <button
        className={style.banner_btn}
        >Cerrar sesión</button>
        <button
        className={style.banner_btn}
        >Mis archivos</button>
    </div>
  )
}

export default Header