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
import { Plus } from "lucide-react";
import { TimePickerAmount, TimePickerTime } from "../ui/timepicker/time-test";
import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export function CreateTable() {
  //   const [desc, setDesc] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-8" variant="outline">
          Create Table <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex gap-2"></DialogDescription>
        <div>
          <TimePickerTime date={selectedDate} setDate={setSelectedDate} />
          <TimePickerTime date={selectedDate} setDate={setSelectedDate} />
          <TimePickerAmount date={selectedDate} setDate={setSelectedDate} />
          <TimePickerAmount date={selectedDate} setDate={setSelectedDate} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="default">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
