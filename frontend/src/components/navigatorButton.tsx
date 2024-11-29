import styles from "../css/header.module.css";
import { CustomizableNavigatorButtonProps } from "../types/types";

function CustomizableNavigatorButton({
  navigationFunctionHandler,
  buttonText,
}: CustomizableNavigatorButtonProps) {
  return (
    <button
      className={styles.banner_btn}
      onClick={() => {
        navigationFunctionHandler();
      }}
    >
      {buttonText}
    </button>
  );
}

export default CustomizableNavigatorButton;
