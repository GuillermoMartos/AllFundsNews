import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  archiveSelectedArticle,
  fetchFreshNews,
  deleteArchivedNewFromUser,
} from "../api/articleApi";
import { externalAPINew } from "../types/article";
import { useAuth } from "../context/AuthContext";
import {
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_USER_TOKEN,
} from "../constants/client";

export const useArticles = () => {
  const [articles, setArticles] = useState<externalAPINew[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newArticlesLoading, setNewArticlesLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const initialNews: externalAPINew[] = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (initialNews && initialNews.length > 0) {
      setArticles(initialNews);
    }
  }, [isAuthenticated]);

  const fetchNewArticles = async () => {
    setNewArticlesLoading(true);
    if (loading && articles && articles.length > 0) return;
    setLoading(true);
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
      setLoading(false);
    }
  };

  const archiveArticle = async (fetchedArticle: externalAPINew) => {
    try {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (userId && token) {
        await archiveSelectedArticle(userId, token, fetchedArticle);
        document.getElementById(fetchedArticle.id)?.remove();
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
        document.getElementById(articleId)?.remove();
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
    removeArticleFromArchive,
  };
};
