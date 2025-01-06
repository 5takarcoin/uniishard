import { tableStyleType, userType } from "@/utils/types";
import { createContext } from "react";

export const UserContext = createContext<{
  user: userType;
  setUser?: React.Dispatch<React.SetStateAction<userType>>;
  tables?: tableStyleType[];
}>({
  user: {} as userType,
  tables: [],
});
