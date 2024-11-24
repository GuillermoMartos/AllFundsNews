import { MESSAGGES } from '../helpers/constants';
import { CustomError } from '../helpers/helpers';
import { ModelNew } from '../helpers/types';
import { Article } from '../models/article';
import { User } from '../models/user';

export async function getArchivedNewsRepository(newsIDs: string[]) {
  const archivedNews = await Article.find({
    id: {
      $in: newsIDs,
    },
  });

  return archivedNews;
}

export async function saveNewArticleOrSetAsUserPrefered(
  normalizedArticle: ModelNew,
  userId: string,
) {
  try {
    const archivedNew = await Article.findOneAndUpdate(
      {
        id: normalizedArticle._id,
      },
      {
        $addToSet: {
          archiveDate: {
            userId: userId,
            archivedStatus: true,
          },
        },
        $setOnInsert: {
          id: normalizedArticle._id,
          title: normalizedArticle.title,
          author: normalizedArticle.author,
          content: normalizedArticle.content,
          description: normalizedArticle.description,
          date: new Date(normalizedArticle.date),
          photo: normalizedArticle.photo,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          archivedNewsIds: archivedNew.id,
        },
      },
      {
        new: true,
      },
    );

    if (!userUpdated) {
      console.error('Usuario no encontrado');
      throw new Error('User not found');
    }

    return archivedNew;
  } catch (error) {
    console.error(
      '[ERROR INESPERADO EN CREACION DE ARCHIVO O ACTUALIZACION DE USUARIO]',
      error,
    );
    throw new CustomError(MESSAGGES.unexpectedError, 500);
  }
}
