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
import { ChevronLeft, Plus, RefreshCcw } from "lucide-react";
import {
  TimePickerAmount,
  TimePickerTime,
} from "@/components/ui/timepicker/time-test";
import { useContext, useEffect, useState } from "react";
import { tableType } from "@/App";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { SlotsContext } from "@/context/slotscontext";

export function CreateTable() {
  const [existing, setExisting] = useState(true);

  //   const [existingTables, setExistingTables] = useState<tableType[]>([]);
  const [currentTable, setCurrentTable] = useState<tableType | null>(null);
  const { setCurrTable } = useContext(SlotsContext);

  const [tables, setTables] = useState<tableType[]>([]);

  const getData = async () => {
    console.log("hifsf");
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const tables = await axios.get(`${baseUrl}/table`);
      setTables(tables.data);
      console.log(tables);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-8" variant="outline">
          Create Table <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center mt-4">Table Shape</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex gap-2">
          {currentTable?.name}
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
            <div className="flex items-center gap-2">
              <Label className="text-md"> Select Existing</Label>
              <Button
                onClick={getData}
                className="text-md mt-1 px-3 rounded-full"
                variant={"ghost"}
              >
                <RefreshCcw />
              </Button>
            </div>
            <div className="">
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
              <Button
                onClick={() => {
                  if (setCurrTable) setCurrTable(currentTable!);
                }}
                type="button"
                variant="default"
              >
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
        <Label className="">Name</Label>
        <span className="flex items-center gap-2">
          <Input className="mt-1 w-2/3"></Input>
          <div className="flex items-center gap-1 flex-row-reverse text-green-500">
            {/* <p className="text-xs">Name exists</p> <Check /> */}
          </div>
        </span>
      </div>
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
