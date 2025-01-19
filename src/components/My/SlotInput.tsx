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
        id: data?.user.currTable?._id,
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
            {s}
            {" - "}
            {date.toLocaleDateString("en-GB")}
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex gap-2"></DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
            <div className="flex flex-colw-72">
              {infos.map((task: string, i: number) => (
                <span
                  className="flex items-center gap-2 border rounded-full py-2 pl-4 pr-2 text-xs justify-between"
                  key={i}
                >
                  <span key={i}>{task}</span>
                  <button onClick={() => setInfos(removeIthElement(infos, i))}>
                    <X className="h-4" />
                  </button>
                </span>
              ))}

              <div className="flex">
                <Input
                  id="inp"
                  value={inp}
                  onChange={(e) => setInp(e.target.value)}
                  className="w-36 "
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
