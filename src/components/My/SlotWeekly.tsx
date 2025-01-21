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
import { Plus, X } from "lucide-react";

import { removeIthElement } from "@/utils/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { slotType } from "@/utils/types";

export function SlotWeekly({
  day,
  dateStr,
  setWeeklies,
}: {
  day: number;
  dateStr: number;
  setWeeklies: React.Dispatch<React.SetStateAction<slotType[]>>;
}) {
  const [title, setTitle] = useState("");
  const [inp, setInp] = useState("");
  const [infos, setInfos] = useState<string[]>([]);

  const handleClick = () => {
    setWeeklies((prev: slotType[]) => [
      ...prev,
      { title, infos, date: `${day}${dateStr}` },
    ]);
  };

  const clearSlot = () => {
    setTitle("");
    setInfos([]);
    setInp("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full w-full" variant="ghost">
          {title}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                            setInfos([...infos, inp]);
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
                    <X className="" />
                  </Button>
                </div>
              </div>
              <div className="flex mt-2">
                <ScrollArea
                  className={`max-h-[400px] w-[380px] whitespace-nowrap p-2`}
                >
                  <div className="flex flex-col gap-2">
                    {infos.map((task: string, i: number) => (
                      <span
                        className="flex w-full items-center gap-2 border py-2 pl-4 pr-2 text-xs justify-between"
                        key={i}
                      >
                        <span key={i}>{task}</span>
                        <button
                          onClick={() =>
                            setInfos(() => [...removeIthElement(infos, i)])
                          }
                        >
                          <X className="h-4" />
                        </button>
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
