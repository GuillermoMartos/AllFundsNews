import { Article } from '../models/article';

export async function getArchivedNewsRepository(newsIDs: string[]) {
  const archivedNews = await Article.find({
    _id: {
      $in: newsIDs,
    },
  });
  return archivedNews;
}
