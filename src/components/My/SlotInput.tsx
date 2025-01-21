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
import { Check, Edit2, Plus, X } from "lucide-react";

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
                    <div className="flex gap-4">
                      <Input
                        id="inp"
                        value={inp}
                        onChange={(e) => setInp(e.target.value)}
                        className="w-56"
                      />
                      <Button
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
                <div className="text-center space-y-2 text-red-400">
                  <p className="text-xs">Clear Entry</p>
                  <Button
                    onClick={clearSlot}
                    variant={"link"}
                    className="border hover:bg-red-500/20 rounded-full border-red-400 text-red-400 w-12 h-12"
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
                          i !== infos.length - 1 ? "border-b pb-2" : ""
                        }`}
                        key={i}
                      >
                        <span className="flex gap-2 items-center">
                          <Button
                            variant={"ghost"}
                            className="h-8 w-8 rounded-full border"
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
                            {task[0] === "1" ? <Check /> : ""}
                          </Button>
                          <span key={i}>{task.substring(1)}</span>
                        </span>
                        <span>
                          <Button
                            variant={"ghost"}
                            className="h-8 w-8 rounded-full"
                            // onClick={//Edit Functionality
                            // }
                          >
                            <Edit2 />
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
