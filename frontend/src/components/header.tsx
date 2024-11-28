import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import style from "../css/header.module.css";
import CustomizableNavigatorButton from "./navigatorButton";
import { CustomizableNavigatorButtonProps } from "../types/types";

function Header({
  navigationFunctionHandler,
  buttonText,
}: CustomizableNavigatorButtonProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  function handleLogoutClick() {
    logout();
  }
  function handleMyArchivesClick() {
    navigate("/my-archives");
  }

  return (
    <div className={style.banner_wrapper}>
      <button
        className={style.banner_btn}
        onClick={() => {
          handleLogoutClick();
        }}
      >
        Cerrar sesión
      </button>
      <button
        className={style.banner_btn}
        onClick={() => {
          handleMyArchivesClick();
        }}
      >
        Mis archivos
      </button>
      <CustomizableNavigatorButton
        navigationFunctionHandler={navigationFunctionHandler}
        buttonText={buttonText}
      ></CustomizableNavigatorButton>
    </div>
  );
}

export default Header;
