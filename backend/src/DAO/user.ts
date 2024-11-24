import { APINew } from '../helpers/types';

export interface userCreateOrLoginResponse {
  id: string;
  freshNews: APINew[];
  archivedNewsIds: string[];
  deletedNewsIds: string[];
}
