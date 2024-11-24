import { APINew, ModelNew } from './types';

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export function normalizeAPINew(APIArticle: APINew): ModelNew {
  const normalizedNew: ModelNew = {
    author: APIArticle.author,
    description: APIArticle.description.slice(0, 20) + '...',
    _id: APIArticle.id,
    date: new Date(APIArticle.published),
    title: APIArticle.title,
    content: APIArticle.description,
  };

  return normalizedNew;
}
