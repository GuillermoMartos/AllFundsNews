import { useEffect, useState } from "react";
import styles from "../css/userForm.module.css";
import { performUserRegister } from "../api/userApi";
import { useNavigate } from "@tanstack/react-router";
import UserInputFormField from "../components/userInputsForm";
import { userFormValidator } from "../helpers/helpers";
import { useAuth } from "../context/AuthContext";

export default function RegisterUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setIsFormDisabled(
      userFormValidator.isEmailValid(email) &&
        userFormValidator.isPasswordValid(password),
    );
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await performUserRegister({ email, password });
      console.log("Register successful:", response);
      login(response.token, response.id);
      navigate({ to: "/userDashboard", params: response.freshNews });
    } catch (error) {
      setIsLoading(false);
      console.error("Register failed:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <section className={styles.form}>
        <h1 className={styles.title}>Registro</h1>

        <p className={styles.desc}>Formulario de Registro</p>

        <form className={styles.form}>
          <div className={styles.inputs_group}>
            <UserInputFormField
              name="email"
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validator={userFormValidator.isEmailValid}
              label="Ingrese su email"
              errorMessage="Formato de email inválido."
            ></UserInputFormField>

            <UserInputFormField
              type="password"
              name="password"
              id="password"
              placeholder="6 caracteres, alfanumérica"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validator={userFormValidator.isPasswordValid}
              label="Ingrese su contraseña"
              errorMessage="Contraseña debe tener 6 caracteres y alfanumérica."
            ></UserInputFormField>
          </div>

          <div className={styles.button}>
            {isLoading ? (
              <div className={styles.isLoading}>Cargando...</div>
            ) : null}
            <input
              className={styles.btn_form}
              disabled={!isFormDisabled || isLoading}
              type="submit"
              value="REGISTRO"
              readOnly
              onClick={(e) => {
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }}
            />
          </div>

          <div className={styles.desc}>
            Ya estás registrad@?{" "}
            <span className={styles.link} onClick={() => navigate({ to: "/" })}>
              INICIAR SESIÓN
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}
