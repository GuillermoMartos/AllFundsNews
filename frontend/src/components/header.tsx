import { useAuth } from "../context/AuthContext";
import style from "../css/header.module.css";
import CustomizableNavigatorButton from "./navigatorButton";
import { CustomizableNavigatorButtonProps } from "../types/types";

function Header({
  navigationFunctionHandler,
  buttonText,
}: CustomizableNavigatorButtonProps) {
  const { logout } = useAuth();
  function handleLogoutClick() {
    logout();
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
      <CustomizableNavigatorButton
        navigationFunctionHandler={navigationFunctionHandler}
        buttonText={buttonText}
      ></CustomizableNavigatorButton>
    </div>
  );
}

export default Header;
