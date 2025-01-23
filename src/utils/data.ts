import { priorityType } from "./types";

export const priorities: priorityType[] = [
  { name: "Diamond", color: "#b9f2ff" }, // Diamond color is often represented as a light blue
  { name: "Gold", color: "#ffd700" }, // Gold color
  { name: "Silver", color: "#c0c0c0" }, // Silver color
];

export const priorityConv: Record<string, string[]> = {
  N: ["None", "#121212"],
  D: ["Diamond", "#b9f2ff"],
  G: ["Gold", "#ffd700"],
  S: ["Silver", "#c0c0c0"],
};
