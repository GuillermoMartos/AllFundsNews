import styles from "../css/UserDashboardPage.module.css";
import { externalAPINew, internalAPINew } from "../types/article";

type NewCardProps = {
  article: externalAPINew | internalAPINew;
  archivado?: boolean;
  archiveArticle: (data:externalAPINew)=>void;
  removeArticleFromArchive: (id:string)=>void;
};

function NewCard({ article, archivado = false, archiveArticle, removeArticleFromArchive }: NewCardProps) {
  const handleClickArchive = (
    articleFetched: externalAPINew | internalAPINew,
    archivado: boolean = false,
  ) => {
    if (archivado) {
      removeArticleFromArchive(articleFetched.id);
    } else {
      archiveArticle(articleFetched as externalAPINew);
    }
  };

  return (
    <div className={styles.new_wrapper} id={article.id} key={article.id}>
      <div className={styles.new_image_space}>
        <img
          loading="lazy"
          className={styles.news_dashboard_img}
          src={article.image}
          alt={article.title}
        />
      </div>
      <section className={styles.info_and_button_section}>
        <section className={styles.news_info_section}>
          <p className={styles.new_title}>{article.title}</p>
          <p className={styles.new_author}>{article.author}</p>
          <p className={styles.new_content}>{article.description}</p>
        </section>

        {archivado ? (
          <button
            className={styles.btn_archivar}
            onClick={() => {
              handleClickArchive(article, archivado);
            }}
          >
            Borrar
          </button>
        ) : (
          <button
            className={styles.btn_archivar}
            onClick={() => {
              handleClickArchive(article);
            }}
          >
            Archivar
          </button>
        )}
      </section>
    </div>
  );
}

export default NewCard;
