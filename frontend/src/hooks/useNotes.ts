import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { archiveSelectedArticle, fetchFreshNews, deleteArchivedNewFromUser } from "../api/articleApi";
import { externalAPINew } from "../types/article";
import { useAuth } from "../context/AuthContext";
import { LOCAL_STORAGE_USER_ID, LOCAL_STORAGE_USER_TOKEN } from "../constants/client";

export const useArticles = () => {
  const [articles, setArticles] = useState<externalAPINew[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newArticlesLoading, setNewArticlesLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const {freshNews: initialNews} = location.state || []

  useEffect(() => {
    if (isAuthenticated) {
      setArticles(initialNews);
      setLoading(false);
    }
  }, [initialNews, isAuthenticated]);

  const fetchNewArticles = async () => {
    setNewArticlesLoading(true);
    try {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (userId && token) {
        const freshNews = await fetchFreshNews(userId, token);
        setArticles(freshNews);
      }
    } catch (error) {
      console.error("Error fetching new articles", error);
    } finally {
      setNewArticlesLoading(false);
    }
  };

  const archiveArticle = async (fetchedArticle: externalAPINew) => {
    try {
        const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
        const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
        if (userId && token) {
          await archiveSelectedArticle(userId, token, fetchedArticle);
          document.getElementById(fetchedArticle.id)?.remove()
        }
      } catch (error) {
        console.error("Error arhiving new, retry", error);
      }
  };

  const removeArticleFromArchive = async (articleId: string) => {
    try {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (userId && token) {
        await deleteArchivedNewFromUser(userId, token, articleId);
        document.getElementById(articleId)?.remove()
      }
    } catch (error) {
      console.error("Error deleting new, retry", error);
    }
  };


  
  return {
    articles,
    loading,
    newArticlesLoading,
    fetchNewArticles,
    archiveArticle,
    removeArticleFromArchive
  };
};
