export interface EsEntity<T> {
  _id: string;
  _index: string;
  _score: number;
  _type: string;
  _source: T;
  [key: string]: any;
}

export interface EsResponse<T> {
  hits?: EsEntity<T>[];
  total?: {
    value: number;
    relation: string;
  };
  max_score?: number;
}
