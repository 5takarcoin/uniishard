import { slotType, tableType } from "@/utils/types";
import { createContext } from "react";

export const SlotsContext = createContext<{
  slots: string[];
  setSlots?: React.Dispatch<React.SetStateAction<string[]>>;
  slotsNum: number[];
  setSlotsNum?: React.Dispatch<React.SetStateAction<number[]>>;
  slotsAha: slotType[];
  setSlotsAha?: React.Dispatch<React.SetStateAction<slotType[]>>;
  tasks: string[];
  setTasks?: React.Dispatch<React.SetStateAction<string[]>>;
  currTable: tableType;
  setCurrTable?: React.Dispatch<React.SetStateAction<tableType>>;
}>({
  slots: [],
  slotsNum: [],
  tasks: [],
  currTable: {} as tableType,
  slotsAha: [],
});

export const CurrTableContext = createContext<tableType>({} as tableType);
