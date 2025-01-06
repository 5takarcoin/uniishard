export interface userType {
  _id: string;
  name: string;
  username: string;
  currTable: tableType | null;
}

export interface tableStyleType {
  name: string;
  start: number;
  end: number;
  duration: number;
  interval: number;
}

export interface tableType {
  _id: string;
  schema: tableStyleType;
  title: string;
  infos: string[];
}
