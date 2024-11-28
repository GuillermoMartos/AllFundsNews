import Header from "../components/header.tsx";
import NewCard from "../components/newCard.tsx";
import styles from "../css/UserDashboardPage.module.css";
import { useEffect, useState } from "react";
import { internalAPINew } from "../types/article.ts";
import {
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_USER_TOKEN,
} from "../constants/client.ts";
import { fetchArchivedNews } from "../api/articleApi.ts";

function ArchivedNewsPage() {
  const [archivedNews, setArchivedNews] = useState<internalAPINew[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
        const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
        if (userId && token) {
          const fetchedArchivedNews = await fetchArchivedNews(userId, token);
          setArchivedNews(fetchedArchivedNews);
        }
      } catch (error) {
        console.error("Error fetching new articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Header></Header>
      {loading ? <div>Cargando...</div> : null}

      <div className={styles.articleWrapper}>
        {archivedNews &&
          archivedNews.map((article) => (
            <NewCard article={article} archivado={true}></NewCard>
          ))}
      </div>
    </>
  );
}

export default ArchivedNewsPage;
