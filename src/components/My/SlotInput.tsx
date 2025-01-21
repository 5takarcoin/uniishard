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

import { removeIthElement } from "@/utils/utils";
import { useNewSlotMutation, useProfileQuery } from "@/store/services/dataApi";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function SlotInput({
  dateStr,
  date,
  s,
  exist,
}: {
  dateStr: number;
  s: string;
  date: Date;
  exist?: { title: string; infos: string[] };
}) {
  const [title, setTitle] = useState(exist?.title || "");
  const [inp, setInp] = useState("");
  const [infos, setInfos] = useState<string[]>(exist?.infos || []);
  const [newSlot] = useNewSlotMutation();

  const [temp, setTemp] = useState<{ title: string; infos: string[] }>({
    title,
    infos,
  });

  const { data } = useProfileQuery(undefined);

  const handleClick = async () => {
    try {
      setTitle(temp.title);
      setInfos(temp.infos);
      await newSlot({
        body: { ...temp, date: dateStr },
        id: data?.user.tables[0]?._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearSlot = () => {
    setTemp({ title: "", infos: [] });
    setInp("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full w-full" variant="ghost">
          {title === temp.title ? title : "Unsaved"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            {s && (
              <>
                {s}
                {" - "}
              </>
            )}
            {date && date.toLocaleDateString("en-GB")}
          </DialogDescription>
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
                              infos: [...temp.infos, "0" + inp],
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
                              task[0] === "1" &&
                              "bg-green-600 hover:bg-green-500"
                            }
                            `}
                            onClick={() => {
                              const t = [...temp.infos];
                              t[i] =
                                t[i][0] === "0"
                                  ? "1" + t[i].substring(1)
                                  : "0" + t[i].substring(1);
                              setTemp({
                                ...temp,
                                infos: t,
                              });
                            }}
                          >
                            {task[0] === "1" && <Check />}
                          </Button>
                          <span
                            className=" w-full h-8 flex items-center"
                            key={i}
                          >
                            {task[0] === "1" ? (
                              <span className="text-sm line-through opacity-20">
                                {task.substring(1)}
                              </span>
                            ) : (
                              <Input
                                value={task.substring(1)}
                                onChange={(e) => {
                                  const t = [...temp.infos];
                                  t[i] = t[i][0] + e.target.value;
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
                        <span>
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
