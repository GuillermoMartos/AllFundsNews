import { addUserToCache } from '../helpers/cache';
import { MESSAGGES } from '../helpers/constants';
import { CustomError } from '../helpers/helpers';
import {
  ModelNew,
  UpdatedOrDeletedIndicator,
  UserData,
} from '../helpers/types';
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
          image: normalizedArticle.image,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    if (!archivedNew) {
      console.error(
        '[ERROR INESPERADO] En Artículo, al guardar en usuario',
        normalizedArticle,
        userId,
      );
      throw new CustomError(MESSAGGES.unexpectedError, 500);
    }

    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          archivedNewsIds: archivedNew.id,
        },
        $min: {
          'userRangeOfInterestDate.lowestDateOfNew': new Date(
            normalizedArticle.date,
          ),
        },
        $max: {
          'userRangeOfInterestDate.highestDateOfNew': new Date(
            normalizedArticle.date,
          ),
        },
      },
      {
        new: true,
      },
    );
    if (!userUpdated) {
      console.error(
        '[ERROR INESPERADO] En Usuario, al appendearle artículo guardado',
        normalizedArticle,
        userId,
      );
      throw new CustomError(MESSAGGES.unexpectedError, 500);
    }
    addUserToCache(userUpdated.id, {
      id: userUpdated.id,
      searchStrategy: userUpdated.searchStrategy,
      archivedNewsIds: userUpdated.archivedNewsIds,
      deletedNewsIds: userUpdated.deletedNewsIds,
    } as UserData);

    return archivedNew;
  } catch (error) {
    console.error(
      '[ERROR INESPERADO EN CREACION DE ARCHIVO O ACTUALIZACION DE USUARIO]',
      error,
    );
    throw new CustomError(MESSAGGES.unexpectedError, 500);
  }
}

export async function deleteArchivedIdFromUserAndAddToDeletedIdRepository(
  userId: string,
  articleId: string,
): Promise<[UserData, UpdatedOrDeletedIndicator]> {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          archivedNewsIds: articleId,
        },
        $addToSet: {
          deletedNewsIds: articleId,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      console.error(
        '[ERROR INESPERADO]: No se encontró usuario o noticia dentro de los archivados del usuario',
      );
      throw new CustomError(MESSAGGES.unexpectedError, 404);
    }

    const articleFound = await Article.findOne({
      id: articleId,
    }).select('archiveDate');

    if (articleFound?.archiveDate.length === 1) {
      // el artículo sólo tenía un usuario appendeado, así que lo podemos borrar
      await Article.deleteOne({
        id: articleId,
      });
      return [
        updatedUser as UserData,
        {
          deleted: true,
          updated: false,
        },
      ];
    } else {
      // el artículo sólo tiene más usuarios suscriptos, así que solo quitamos a nuestro usuario
      await Article.updateOne(
        {
          id: articleId,
        },
        {
          $pull: {
            archiveDate: {
              userId,
            },
          },
        },
      );
      return [
        updatedUser as UserData,
        {
          deleted: false,
          updated: true,
        },
      ];
    }
  } catch (error) {
    console.error(
      '[ERROR INESPERADO] En proceso de quitar artículo archivado y pasar a borrado',
      error,
    );
    throw new CustomError(MESSAGGES.unexpectedError, 500);
  }
}
