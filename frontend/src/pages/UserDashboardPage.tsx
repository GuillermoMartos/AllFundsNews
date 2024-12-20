import { useNavigate } from "react-router-dom";
import Header from "../components/header.tsx";
import NewCard from "../components/newCard.tsx";
import styles from "../css/UserDashboardPage.module.css";
import { useArticles } from "../hooks/useArticles.ts";
import { useEffect } from "react";

function UserDashboardPage() {
  const { articles, newArticlesLoading, fetchNewArticles } = useArticles();
  const navigate = useNavigate();

  const handleClickFetchNews = () => {
    fetchNewArticles();
  };

  useEffect(() => {
    if (articles && articles.length === 0) {
      const fetcher = async () => {
        await fetchNewArticles();
      };
      fetcher();
    }
  }, []);

  return (
    <>
      <Header
        buttonText="Mis archivos"
        navigationFunctionHandler={() => {
          navigate("/my-archives");
        }}
      ></Header>

      <div className={styles.articleWrapper}>
        {articles &&
          articles.map((article) => <NewCard article={article}></NewCard>)}

        <button
          className={styles.btn_archivar}
          onClick={() => {
            handleClickFetchNews();
          }}
          disabled={newArticlesLoading}
        >
          Buscar noticias!
        </button>
        {newArticlesLoading ? "Cargando nuevas noticias..." : null}
      </div>
    </>
  );
}

export default UserDashboardPage;
