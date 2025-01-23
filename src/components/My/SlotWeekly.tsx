import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowDown, ArrowUp, Check, Plus, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { removeIthElement } from "@/utils/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { priorityType, slotType } from "@/utils/types";
import { priorities } from "@/utils/data";
import { deepEqual } from "@/lib/utils";
import { getContrastColor } from "@/lib/colorUtils";

export function SlotWeekly({
  day,
  dateStr,
  setWeeklies,
  color = "#000000",
}: {
  day: number;
  dateStr: number;
  setWeeklies: React.Dispatch<React.SetStateAction<slotType[]>>;
  color: string;
}) {
  const [title, setTitle] = useState("");
  const [inp, setInp] = useState("");
  const [infos, setInfos] = useState<string[]>([]);

  const [temp, setTemp] = useState<{ title: string; infos: string[] }>({
    title,
    infos,
  });

  const handleClick = () => {
    setTitle(temp.title);
    setInfos(temp.infos);
    setWeeklies((prev: slotType[]) => [
      ...prev,
      { ...temp, date: `${day}${dateStr}` },
    ]);
  };

  const textColor = getContrastColor(color);

  const clearSlot = () => {
    setTitle("");
    setInfos([]);
    setInp("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // style={{ backgroundColor: (title || temp.title) && color, color: (title || temp.title) && textColor }}
          style={
            title || temp.title
              ? { backgroundColor: color, color: textColor }
              : {}
          }
          className={`h-full w-full ${
            !deepEqual({ title, infos }, temp) &&
            "border opacity-60 border-yellow-400 bg-black"
          }`}
          variant="ghost"
        >
          {!deepEqual({ title, infos }, temp) && (
            <span className="text-yellow-400 text-xs font-thin">Unsaved</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>{dateStr}</DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex gap-2"></DialogDescription>
        <div className="">
          <div className=" ">
            <div className="">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    value={temp.title}
                    onChange={(e) =>
                      setTemp({ ...temp, title: e.target.value })
                    }
                    className="w-72"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-4 items-center">
                      <Input
                        id="inp"
                        value={inp}
                        onChange={(e) => setInp(e.target.value)}
                        className="w-60"
                      />
                      <Button
                        className="h-8 w-8 rounded-full bg-white"
                        onClick={() => {
                          if (inp !== "") {
                            setTemp({
                              ...temp,
                              infos: [...temp.infos, "N0" + inp],
                            });
                            setInp("");
                          }
                        }}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2 text-red-400 mr-2">
                  <p className="text-xs">Clear Entry</p>
                  <Button
                    onClick={clearSlot}
                    variant={"link"}
                    className="border hover:bg-red-500/70 hover:text-white/70 rounded-full border-red-500 hover:border-red-500/70 text-red-400 w-8 h-8 "
                  >
                    <X />
                  </Button>
                </div>
              </div>
              <div className="flex mt-2">
                <ScrollArea
                  className={`max-h-[400px] w-[380px] whitespace-nowrap p-2`}
                >
                  <div className="flex flex-col gap-2">
                    {temp.infos.map((task: string, i: number) => (
                      <span
                        className={`flex w-full items-center gap-2 text-xs justify-between ${
                          i !== temp.infos.length - 1 && "border-b pb-2"
                        }`}
                        key={i}
                      >
                        <span className="w-full flex gap-2 items-center">
                          <Button
                            variant={"ghost"}
                            className={`h-8 w-8 rounded-full border 
                            ${
                              task[1] === "1" &&
                              "bg-green-600 hover:bg-green-500"
                            }
                            `}
                            onClick={() => {
                              const t = [...temp.infos];
                              t[i] =
                                t[i][1] === "0"
                                  ? t[i][0] + "1" + t[i].substring(2)
                                  : t[i][0] + "0" + t[i].substring(2);
                              setTemp({
                                ...temp,
                                infos: t,
                              });
                            }}
                          >
                            {task[1] === "1" && <Check />}
                          </Button>
                          <span
                            className=" w-full h-8 flex items-center"
                            key={i}
                          >
                            {task[1] === "1" ? (
                              <span className="text-sm line-through opacity-20">
                                {task.substring(2)}
                              </span>
                            ) : (
                              // Ahhhaaa
                              <Input
                                value={task.substring(2)}
                                onChange={(e) => {
                                  const t = [...temp.infos];
                                  t[i] = t[i][0] + t[i][1] + e.target.value;
                                  setTemp({
                                    ...temp,
                                    infos: t,
                                  });
                                }}
                                className={`border-none focus-visible:ring-0 -ml-3`}
                              ></Input>
                            )}
                          </span>
                        </span>
                        <span className="flex">
                          <Button
                            variant={"ghost"}
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              if (i === 0) return;
                              const t = [...temp.infos];
                              const tmp = t[i];
                              t[i] = t[i - 1];
                              t[i - 1] = tmp;
                              setTemp({
                                ...temp,
                                infos: t,
                              });
                            }}
                          >
                            <ArrowUp />
                          </Button>
                          <Button
                            variant={"ghost"}
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              if (i === temp.infos.length - 1) return;
                              const t = [...temp.infos];
                              const tmp = t[i];
                              t[i] = t[i + 1];
                              t[i + 1] = tmp;
                              setTemp({
                                ...temp,
                                infos: t,
                              });
                            }}
                          >
                            <ArrowDown />
                          </Button>
                          <Button
                            variant={"ghost"}
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              setTemp({
                                ...temp,
                                infos: [...removeIthElement(temp.infos, i)],
                              })
                            }
                          >
                            <X />
                          </Button>
                          <div className="">
                            <Select
                              value={temp.infos[i][0]}
                              onValueChange={(e) => {
                                const t = [...temp.infos];
                                t[i] = e + t[i].substring(1);
                                setTemp({
                                  ...temp,
                                  infos: t,
                                });
                              }}
                            >
                              <SelectTrigger
                                id="popup-select-trigger"
                                className="w-32 h-8 rounded-full focus-visible:ring-0"
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>

                              <SelectContent position="popper">
                                {priorities.map(
                                  (p: priorityType, i: number) => (
                                    <SelectItem key={i} value={p.name[0]}>
                                      <div className="flex gap-2 justify-between items-center">
                                        <div
                                          style={{ backgroundColor: p.color }}
                                          className="h-4 w-4 bg-red-300 rounded-full"
                                        ></div>
                                        <span style={{ color: p.color }}>
                                          {p.name}
                                        </span>{" "}
                                      </div>
                                    </SelectItem>
                                  )
                                )}
                                <SelectItem key={i} value={"N"}>
                                  <div className="flex gap-2 justify-between items-center">
                                    <div
                                      style={{ backgroundColor: "#121212" }}
                                      className="h-4 w-4 border rounded-full"
                                    ></div>
                                    <span style={{ color: "#ffffff" }}>
                                      None
                                    </span>{" "}
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </span>
                      </span>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClick} type="button" variant="default">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
