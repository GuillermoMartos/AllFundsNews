import styles from "../css/userForm.module.css";
import { UserInputFieldProps } from "../types/types";

function UserInputFormField({
  type,
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  validator,
  errorMessage,
}: UserInputFieldProps) {
  const isValid = validator ? validator(value) : true;

  return (
    <div className={styles.inputs}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {!isValid && <p className={styles.error_mesage}>{errorMessage}</p>}
    </div>
  );
}

export default UserInputFormField;
