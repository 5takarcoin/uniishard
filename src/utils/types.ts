export interface userType {
  _id: string;
  name: string;
  username: string;
  tables: tableType[];
}

export interface tableStyleType {
  _id?: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  interval: number;
}

export interface tableType {
  _id: string;
  name: string;
  schema: tableStyleType;
  title: string;
  slots: slotType[];
  weekly: slotType[];
  color: string;
}

export interface slotType {
  date: string;
  title: string;
  infos: string[];
}

export interface priorityType {
  name: string;
  color: string;
}
