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
  _id?: string;
}
