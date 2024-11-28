 
import Header from "../../components/header.tsx";
import styles from "../../css/UserDashboardPage.module.css";
import { useArticles } from "../../hooks/useNotes";
import { externalAPINew } from "../../types/article.ts";

function UserDashboardPage() {

  const {  articles,
    loading,
    newArticlesLoading,
    fetchNewArticles,
    archiveArticle,
   } = useArticles();

  const handleClickArchive = (articleFetched:externalAPINew) => {
    archiveArticle(articleFetched)
  };
  
  const handleClickFetchNews = () => {
    fetchNewArticles()
  };

  return (
    <>
    <Header></Header>
        {loading ? <div>Cargando...</div> : null}
        
      <div className={styles.articleWrapper}>
   
          {articles && articles.map((article) => (
            <div className={styles.new_wrapper} id={article.id} key={article.id}>
              <div className={styles.new_image_space}>
              <img loading="lazy" className={styles.news_dashboard_img} src={article.image} alt={article.title}/>
              </div>
              <section className={styles.info_and_button_section}>

              <section className={styles.news_info_section}>
              <p className={styles.new_title}>{article.title}</p>
              <p className={styles.new_author}>{article.author}</p>
              <p className={styles.new_content}>{article.description}</p>
              </section>

              <button
                className={styles.btn_archivar}
                onClick={() => {handleClickArchive(article as externalAPINew)}}
                >
                Archivar
              </button>
                </section>
            
            </div>
          ))}

  <button className={styles.btn_archivar} onClick={()=>{handleClickFetchNews()}} disabled={newArticlesLoading}>Buscar noticias!</button>
{newArticlesLoading ? "Cargando nuevas noticias..." : null}
      </div>
    </>
  );
}

export default UserDashboardPage;
