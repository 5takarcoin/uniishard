import { tableType } from "@/App";
import { createContext } from "react";

export const UserContext = createContext<{
  user: userType | null;
  setUser?: React.Dispatch<React.SetStateAction<userType | null>>;
  tables: tableType[];
}>({
  user: null,
  tables: [],
});

export interface userType {
  name: string;
  username: string;
  tables: tableType[];
  currTable: tableType | null;
}
