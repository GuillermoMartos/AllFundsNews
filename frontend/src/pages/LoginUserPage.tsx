import { useEffect, useState } from "react";
import styles from "../css/userForm.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { performUserLogin } from "../api/userApi";
import { userFormValidator } from "../helpers/helpers";
import UserInputFormField from "../components/userInputsForm";
import { externalAPINew } from "../types/article";

export default function LoginUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freshNews, setFreshNews] = useState<externalAPINew[]>([]);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/userDashboard", state(prev) {
        return { ...prev, freshNews: freshNews };
      }, });
    }
    setIsFormDisabled(
      userFormValidator.isEmailValid(email) &&
        userFormValidator.isPasswordValid(password),
    );
  }, [email, password, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await performUserLogin({
        email,
        password,
      });
      login(response.token, response.id);
      setFreshNews(response.freshNews);
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.form}>
        <h1 className={styles.title}>Iniciar Sesión</h1>

        <p className={styles.desc}>Inicie sesión</p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
          }}
        >
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
              errorMessage="Contraseña debe tener 6 caracteres y alfanumérica"
            ></UserInputFormField>
          </div>

          <div className={styles.button}>
            <button
              className={styles.btn_form}
              disabled={!isFormDisabled}
              type="submit"
            >
              INICIAR SESIÓN
            </button>
          </div>

          <div className={styles.desc}>
            No estás registrad@?{" "}
            <span
              className={styles.link}
              onClick={() => navigate({ to: "/register" })}
            >
              REGISTRO
            </span>
          </div>
        </form>
        {isLoading ? <div className={styles.isLoading}>Cargando...</div> : null}
      </section>
    </div>
  );
}
