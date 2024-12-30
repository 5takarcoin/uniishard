import { tableType } from "@/App";
import { createContext } from "react";

export const UserContext = createContext<{
  user: userType;
  setUser?: React.Dispatch<React.SetStateAction<userType>>;
  tables: tableType[];
}>({
  user: {} as userType,
  tables: [],
});

export interface userType {
  name: string;
  username: string;
  tables: tableType[];
  currTable: tableType | null;
}
