import { createContext } from "react";

export const SlotsContext = createContext<{
  slots: string[];
  setSlots?: React.Dispatch<React.SetStateAction<string[]>>;
  tasks: string[];
  setTasks?: React.Dispatch<React.SetStateAction<string[]>>;
}>({ slots: [], tasks: [] });
