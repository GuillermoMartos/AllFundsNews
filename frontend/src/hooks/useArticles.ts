import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
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
  const [internalArticles, setInternalArticles] = useState<externalAPINew[]>(
    [],
  );
  const [articles, setArticles] = useState<externalAPINew[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newArticlesLoading, setNewArticlesLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const initialNews: externalAPINew[] = (
    location.state as { freshNews: externalAPINew[] }
  ).freshNews;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
    if (window.location.pathname === "/my-archives") return;
    else if (initialNews && initialNews.length > 0) {
      setArticles(initialNews.slice(0, 20));
      setInternalArticles(initialNews.slice(20));
    } else {
      fetchNewArticles();
    }
  }, [isAuthenticated]);

  const fetchNewArticles = async () => {
    setNewArticlesLoading(true);
    setLoading(true);
    try {
      const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
      const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (userId && token) {
        if (internalArticles.length > 0) {
          setArticles((prev) => prev.concat(internalArticles.slice(0, 20)));
          setInternalArticles(internalArticles.slice(20));
          return;
        }
        const freshNews = await fetchFreshNews(userId, token);
        setArticles((prev) => prev.concat(freshNews.slice(0, 20)));
        setInternalArticles(freshNews.slice(20));
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
