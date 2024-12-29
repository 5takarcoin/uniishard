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
import { ChevronLeft, Plus } from "lucide-react";
import {
  TimePickerAmount,
  TimePickerTime,
} from "@/components/ui/timepicker/time-test";
import { useContext, useState } from "react";
import { tableType } from "@/App";
import { UserContext } from "@/context/usercontext";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateTable() {
  const [existing, setExisting] = useState(true);

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
          <DialogTitle className="text-center">Table Shape</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex gap-2">
          {/* {currentTable?.name} */}
        </DialogDescription>
        {!existing ? (
          <NewSchema />
        ) : (
          <div className="m-auto mb-8">
            <Button
              onClick={() => setExisting(false)}
              className="p-8 text-sm"
              variant="outline"
            >
              Create New Shape <Plus />
            </Button>
          </div>
        )}
        {existing && (
          <>
            <div className="h-[1rem] flex items-center justify-between">
              <div className="h-[1px] bg-gray-500/50 flex-1"></div>
              <Label className="h-[1rem px-2">Or</Label>
              <div className="h-[1px] bg-gray-500/50 flex-1"></div>
            </div>
            <Label className="text-md"> Select Existing</Label>
            <div>
              <SelectExistingTable
                currentTable={currentTable}
                setCurrentTable={setCurrentTable}
                tables={tables}
              />
            </div>
            <div></div>
          </>
        )}
        <DialogFooter>
          <div className="flex flex-row-reverse direction-reverse justify-between w-full">
            <DialogClose asChild>
              <Button type="button" variant="default">
                Save
              </Button>
            </DialogClose>
            {!existing && (
              <Button
                onClick={() => setExisting(true)}
                type="button"
                variant="outline"
              >
                <span className="-ml-2">
                  <ChevronLeft />
                </span>{" "}
                Select Existing
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SelectExistingTable({
  currentTable,
  setCurrentTable,
  tables,
}: {
  currentTable: tableType | null;
  setCurrentTable: React.Dispatch<React.SetStateAction<tableType | null>>;
  tables: tableType[];
}) {
  return (
    <Select
      value={currentTable?.name || undefined}
      onValueChange={(value) => {
        const selectedTable = tables.find((table) => table.name === value);
        setCurrentTable(selectedTable || null);
        console.log(currentTable);
      }}
    >
      <SelectTrigger id="popup-select-trigger" className="w-32">
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent position="popper">
        {tables.map((table: tableType, i: number) => (
          <SelectItem key={i} value={table.name}>
            {table.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NewSchema() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label>Start</Label>
        <TimePickerTime date={selectedDate} setDate={setSelectedDate} />
      </div>
      <div>
        <Label>End</Label>
        <TimePickerTime date={selectedDate} setDate={setSelectedDate} />
      </div>
      <div>
        <Label>Duration</Label>
        <TimePickerAmount date={selectedDate} setDate={setSelectedDate} />
      </div>
      <div>
        <Label>Interval</Label>
        <TimePickerAmount date={selectedDate} setDate={setSelectedDate} />
      </div>
      <div className="mb-2"></div>
    </div>
  );
}
