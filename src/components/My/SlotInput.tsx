import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { X } from "lucide-react";

import { SlotsContext } from "@/context/slotscontext";

function DropdownMenuDemo({
  addedTasks,
  setAddedTasks,
}: {
  addedTasks: string[];
  setAddedTasks: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { tasks } = useContext<any>(SlotsContext);
  const [selectVal, setSelectVal] = useState<number>(Date.now());
  return (
    <Select
      key={selectVal}
      onValueChange={(value) => {
        setSelectVal(Date.now());
        setAddedTasks([...addedTasks, value]);
      }}
    >
      <SelectTrigger id="popup-select-trigger" className="w-32">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      {tasks.filter((task: string) => addedTasks.includes(task) === false)
        .length > 0 && (
        <SelectContent position="popper">
          {tasks
            .filter((task: string) => addedTasks.includes(task) === false)
            .map((task: string, i: number) => (
              <SelectItem key={i} value={task}>
                {task}
              </SelectItem>
            ))}
        </SelectContent>
      )}
    </Select>
  );
}

export function SlotInput({ date }: { date: Date }) {
  const [addedTasks, setAddedTasks] = useState<string[]>([]);

  //   const [desc, setDesc] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full w-full" variant="ghost"></Button>
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            {date.toLocaleDateString("en-GB")}
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex gap-2">
          {addedTasks.map((task: string, i: number) => (
            <span
              className="flex items-center gap-2 border rounded-full py-2 pl-4 pr-2 text-xs justify-between"
              key={i}
            >
              <span key={i}>{task}</span>
              <button
                onClick={() =>
                  setAddedTasks(addedTasks.filter((t) => t !== task))
                }
              >
                <X className="h-4" />
              </button>
            </span>
          ))}
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input
              id="name"
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
              className="col-span-3"
            /> */}
            <DropdownMenuDemo
              addedTasks={addedTasks}
              setAddedTasks={setAddedTasks}
            />
          </div>
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
