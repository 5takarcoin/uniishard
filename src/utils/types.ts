export interface userType {
  _id: string;
  name: string;
  username: string;
  currTable: tableType | null;
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
  schema: tableStyleType;
  title: string;
  slots: slotType[];
}

export interface slotType {
  date: string;
  title: string;
  infos: string[];
}

export interface Dictionary {
  [key: string]: {
    title: string;
    infos: string[];
  };
}
