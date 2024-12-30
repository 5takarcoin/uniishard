import { createContext } from "react";
import { tableType } from "@/App";

export const SlotsContext = createContext<{
  slots: string[];
  setSlots?: React.Dispatch<React.SetStateAction<string[]>>;
  tasks: string[];
  setTasks?: React.Dispatch<React.SetStateAction<string[]>>;
  currTable: tableType;
  setCurrTable?: React.Dispatch<React.SetStateAction<tableType>>;
}>({ slots: [], tasks: [], currTable: {} as tableType });

export const CurrTableContext = createContext<tableType>({} as tableType);
