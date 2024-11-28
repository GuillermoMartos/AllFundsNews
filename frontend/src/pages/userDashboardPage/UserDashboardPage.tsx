 
import Header from "../../components/header.tsx";
import styles from "../../css/UserDashboardPage.module.css";
import moreStyles from "../../css/header.module.css";
import { useArticles } from "../../hooks/useNotes";

function UserDashboardPage() {

  const {  
    loading,
    newArticlesLoading,
    fetchNewArticles,
    archiveArticle, fixed
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
    <>
    <Header></Header>
        {loading ? <div>Cargando...</div> : null}
        
      <div className={styles.articleWrapper}>
   
          {fixed && fixed.map((article) => (
            <div className={styles.new_wrapper} id={article.id} key={article.id}>
              <div className={styles.new_image_space}>
              <img loading="lazy" className={styles.news_dashboard_img} src={article.image} alt={article.title.slice(0,15)}/>
              </div>
              <section className={styles.info_and_button_section}>

              <section className={styles.news_info_section}>
              <p className={styles.new_title}>{article.title}</p>
              <p className={styles.new_author}>{article.author}</p>
              <p className={styles.new_content}>{article.description}</p>
              </section>

              <button
                className={styles.btn_archivar}
                onClick={() => {handleClickArchive(article.id)}}
                >
                Archivar
              </button>
                </section>
            
            </div>
          ))}

  <button className={moreStyles.btn_banner} onClick={()=>{handleClickFetchNews()}} disabled={newArticlesLoading}>Buscar noticias!</button>
{newArticlesLoading ? "Cargando nuevas noticias..." : "Buscar más noticias!"}
      </div>
    </>
  );
}

export default UserDashboardPage;
