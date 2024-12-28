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
import { TimePicker12Demo } from "../ui/timepicker/time-test";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export function CreateTable() {
  //   const [desc, setDesc] = useState("");
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
        <TimePicker12Demo
          date={new Date()}
          setDate={(date) => {
            console.log(date);
          }}
        />
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
