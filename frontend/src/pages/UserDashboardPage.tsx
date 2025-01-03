import { useNavigate } from "@tanstack/react-router";
import Header from "../components/header.tsx";
import NewCard from "../components/newCard.tsx";
import styles from "../css/UserDashboardPage.module.css";
import { useArticles } from "../hooks/useArticles.ts";

export default function UserDashboardPage() {
  const {
    articles,
    newArticlesLoading,
    fetchNewArticles,
    removeArticleFromArchive,
    archiveArticle,
  } = useArticles();
  const navigate = useNavigate();

  const handleClickFetchNews = () => {
    fetchNewArticles();
  };

  return (
    <>
      <Header
        buttonText="Mis archivos"
        navigationFunctionHandler={() => {
          navigate({ to: "/my-archives" });
        }}
      ></Header>

      <div className={styles.articleWrapper}>
        {articles &&
          articles.map((article) => (
            <NewCard
              article={article}
              removeArticleFromArchive={removeArticleFromArchive}
              archiveArticle={archiveArticle}
            ></NewCard>
          ))}

        {newArticlesLoading ? (
          "Cargando nuevas noticias..."
        ) : (
          <button
            className={styles.btn_archivar}
            onClick={() => {
              handleClickFetchNews();
            }}
            disabled={newArticlesLoading}
          >
            Buscar más noticias!
          </button>
        )}
      </div>
    </>
  );
}
