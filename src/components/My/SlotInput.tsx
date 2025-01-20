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

  const { data } = useProfileQuery(undefined);

  const handleClick = async () => {
    try {
      await newSlot({
        body: { title, infos, date: dateStr },
        id: data?.user.tables[0]?._id,
      });
    } catch (error) {
      console.log(error);
    }
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
          <DialogDescription>
            {s && (
              <>
                {s}
                {" - "}
              </>
            )}
            {date.toLocaleDateString("en-GB")}
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex gap-2"></DialogDescription>
        <div className="">
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
