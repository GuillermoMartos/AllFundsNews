import { externalAPINew } from "./article";

export interface userLoginResponseObject {
  id: string;
  archivedNewsIds: string[];
  deletedNewsIds: string[];
  freshNews:externalAPINew[];
  token: string;
}
