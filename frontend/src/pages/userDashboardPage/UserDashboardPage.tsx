 
import styles from "../../css/UserDashboardPage.module.css";
import btnStyles from "../../css/userForm.module.css";
import{ useAuth } from "../../context/AuthContext";
import { useArticles } from "../../hooks/useNotes";

function UserDashboardPage() {
const { logout } = useAuth();

  const {  articles,
    loading,
    newArticlesLoading,
    fetchNewArticles,
    archiveArticle,
   } = useArticles();

  const handleClickArchive = (articleId:string) => {
    console.log('hola')
    archiveArticle(articleId)
  };
  
  const handleClickFetchNews = () => {
    console.log('a buscar!')
    fetchNewArticles()
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>

        {loading ? <div>Cargando...</div> : null}
        <button
          className={btnStyles.btn_form}
          onClick={() => {
            logout();
          }}
        >
          Cerrar Sesión
        </button>
      </div>
      <h1>AllFunds News</h1>
      
      <div className={styles.notesWrapper}>
        <ul>
          {articles && articles.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.author}</p>
              <p className={styles.contentCards}>{article.description}</p>
              <img loading="lazy" src={article.image} alt={article.title.slice(0,15)}/>
              <button
                className={btnStyles.btn_form}
                onClick={() => {handleClickArchive(article.id)}}
              >
                Archivar noticia
              </button>
            </li>
          ))}

          <button onClick={()=>{handleClickFetchNews()}} disabled={newArticlesLoading}>
        {newArticlesLoading ? "Cargando nuevas noticias..." : "Buscar más noticias!"}
      </button>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboardPage;
