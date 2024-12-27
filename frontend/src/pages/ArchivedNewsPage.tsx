import Header from "../components/header.tsx";
import NewCard from "../components/newCard.tsx";
import styles from "../css/UserDashboardPage.module.css";
import {
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_USER_TOKEN,
} from "../constants/client.ts";
import { fetchArchivedNews } from "../api/articleApi.ts";
import { useNavigate } from "@tanstack/react-router";
import { useArticles } from "../hooks/useArticles.ts";
import { useQuery } from "@tanstack/react-query";

export default function ArchivedNewsPage() {
  const { isLoading, data: archivedNews } = useQuery({
    queryKey: ["my-archives"],
    queryFn: async () => {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (!userId || !token) throw new Error("User ID or Token is missing");
      return await fetchArchivedNews(userId, token);
    },
    staleTime: 1000 * 5,
  });

  const navigate = useNavigate();
  const { removeArticleFromArchive, archiveArticle } = useArticles();

  return (
    <>
      <Header
        buttonText="Volver a Noticias"
        navigationFunctionHandler={() => {
          navigate({ to: "/userDashboard" });
        }}
      ></Header>
      {isLoading ? <div>Cargando...</div> : null}

      <div className={styles.articleWrapper}>
        {archivedNews &&
          archivedNews.length > 0 &&
          archivedNews.map((article) => (
            <NewCard
              article={article}
              archivado={true}
              removeArticleFromArchive={removeArticleFromArchive}
              archiveArticle={archiveArticle}
            ></NewCard>
          ))}
      </div>
    </>
  );
}
