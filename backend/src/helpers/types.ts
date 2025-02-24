export interface APINew {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  laguage: string;
  category: unknown;
  published: string;
}

export interface APINews {
  status: string;
  news: APINew[];
}

export interface ModelNew {
  date: Date;
  title: string;
  author: string;
  content: string;
  description: string;
  _id: string;
  image: string;
}

export interface RangesOfInterest {
  highestDateOfNew: Date | null;
  lowestDateOfNew: Date | null;
}

export interface UserData {
  id: string;
  archivedNewsIds: string[];
  deletedNewsIds: string[];
  userRangeOfInterestDate?: RangesOfInterest;
  searchStrategy: string[];
  email: String;
  password: String;
}

export interface UpdatedOrDeletedIndicator {
  updated: boolean;
  deleted: boolean;
}

export interface CryptedData {
  cryptedData: string;
}
