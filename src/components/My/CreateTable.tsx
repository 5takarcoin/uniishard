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
import { Plus } from "lucide-react";
import { TimePickerAmount, TimePickerTime } from "../ui/timepicker/time-test";
import { useContext, useState } from "react";
import { tableType } from "@/App";
import { UserContext } from "@/context/usercontext";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export function CreateTable() {
  //   const [desc, setDesc] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  //   const [existingTables, setExistingTables] = useState<tableType[]>([]);
  const [currentTable, setCurrentTable] = useState<tableType | null>(null);

  const { tables } = useContext(UserContext);

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
        <DialogDescription className="flex gap-2">
          {currentTable?.name}
        </DialogDescription>
        <div>
          <TimePickerTime date={selectedDate} setDate={setSelectedDate} />
          <TimePickerTime date={selectedDate} setDate={setSelectedDate} />
          <TimePickerAmount date={selectedDate} setDate={setSelectedDate} />
          <TimePickerAmount date={selectedDate} setDate={setSelectedDate} />
        </div>
        <p>Or</p>
        <div>
          <SelectExistingTable
            setCurrentTable={setCurrentTable}
            tables={tables}
          />
        </div>
        <div></div>
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

function SelectExistingTable({
  setCurrentTable,
  tables,
}: {
  setCurrentTable: React.Dispatch<React.SetStateAction<tableType | null>>;
  tables: tableType[];
}) {
  const [selectVal, setSelectVal] = useState<number>(Date.now());

  const demoTables: tableType[] = tables;

  return (
    <Select
      key={selectVal}
      onValueChange={(value) => {
        setSelectVal(Date.now());
        for (const table of demoTables) {
          if (table.name === value) {
            setCurrentTable(table);
            break;
          }
        }
      }}
    >
      <SelectTrigger id="popup-select-trigger" className="w-32">
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent position="popper">
        {demoTables.map((table: tableType, i: number) => (
          <SelectItem key={i} value={table.name}>
            {table.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
