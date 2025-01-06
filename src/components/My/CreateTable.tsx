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
import { ChevronLeft, Plus, RefreshCcw, X } from "lucide-react";
import { TimePickerTime } from "@/components/ui/timepicker/time-test";
import React, { useContext, useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import axios from "axios";
// import { SlotsContext } from "@/context/slotscontext";
import { UserContext } from "@/context/usercontext";
import { CalCal } from "./Calendar";
import { formatHHMM } from "@/utils/utils";
import { tableStyleType, userType } from "@/utils/types";

const handleSetUserCurrTable = async (
  sU: React.Dispatch<React.SetStateAction<userType>>,
  un: string,
  tab: string
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const us = await axios.put(`${baseUrl}/user/${un}`, {
    currTable: tab,
  });
  console.log(us.data);
  sU(us.data);
};

const addSetTable = async (shape: tableStyleType, user: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const got = await axios.post(`${baseUrl}/tableStyle`, shape);
  const tab = await axios.post(`${baseUrl}/table`, {
    slots: [],
    owner: user,
    schema: got.data._id,
  });
  console.log("muhhahaha" + tab.data);
  return tab.data;
};

const existingSetTable = async (shape: tableStyleType, user: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const got = await axios.get(`${baseUrl}/tableStyle/:${shape._id}`);
  if (shape.name) {
    const tab = await axios.post(`${baseUrl}/table`, {
      slots: [],
      owner: user,
      schema: shape._id,
    });
    // console.log("muhhahaha" + got.data);
    return tab.data;
  }
};

const updateCurrTable = async (un: string, id: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const tab = await axios.get(`${baseUrl}tableStyle/${id}`);
  await axios.put(`${baseUrl}user/${un}`, {
    currTable: tab.data._id,
  });
  return tab.data;
};

export function CreateTable({ change = false }: { change?: boolean }) {
  const [existing, setExisting] = useState(true);
  // const { currTable } = useContext(SlotsContext);
  //   const [existingTables, setExistingTables] = useState<tableType[]>([]);
  const [currentTable, setCurrentTable] = useState<tableStyleType | null>(null);
  // const { currTable, setCurrTable } = useContext(SlotsContext);
  const { user, setUser } = useContext(UserContext);

  const [tables, setTables] = useState<tableStyleType[]>([]);

  const [shape, setShape] = useState<tableStyleType>({} as tableStyleType);

  const getData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const tables = await axios.get(`${baseUrl}/tableStyle`);
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
          {!change ? "Create" : "Change"} Table <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        //  className="w-[425px]"
        className="w-[900px] max-w-none h-[500px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Table Shape</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex  w-ful overflow-x-auto">
          <div className="">
            {!existing ? (
              <NewSchema setShape={setShape} />
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
                  <Button
                    onClick={() => setCurrentTable({} as tableStyleType)}
                    className="text-md mt-1 px-3 rounded-full"
                    variant={"ghost"}
                  >
                    <X />
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
          </div>
          <div className="w-[1px] bg-gray-500/30 mt-4 mx-4" />
          <div className="">
            {/* Cursor */}
            {existing && currentTable?.name && (
              <CalCal currTable={currentTable!} />
            )}
            {!existing && shape?.name && <CalCal currTable={shape!} />}
            {((existing && !currentTable?.name) ||
              (!existing && !shape?.name)) && (
              <div className="flex  items-center justify-center">
                <DialogDescription className="text-center">
                  <span className="">
                    Select a Table <br />
                    or <br />
                    Create a new one
                  </span>
                </DialogDescription>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row-reverse direction-reverse justify-between w-full">
            <DialogClose asChild>
              <Button
                onClick={async () => {
                  if (!existing) {
                    const tab = await addSetTable(shape, user._id);
                    await handleSetUserCurrTable(
                      setUser!,
                      user.username,
                      tab._id
                    );
                    // await updateCurrTable(user.username, shape.name);
                  } else {
                    await updateCurrTable(user.username, currentTable!.name);
                    const tab = await existingSetTable(currentTable!, user._id);
                    await handleSetUserCurrTable(
                      setUser!,
                      user.username,
                      tab._id
                    );
                  }
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
  currentTable: tableStyleType | null;
  setCurrentTable: React.Dispatch<React.SetStateAction<tableStyleType | null>>;
  tables: tableStyleType[];
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
        {tables.map((table: tableStyleType, i: number) => (
          <SelectItem key={i} value={table.name}>
            {table.name}
            {table._id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NewSchema({
  setShape,
}: {
  setShape: React.Dispatch<React.SetStateAction<tableStyleType>>;
}) {
  const [inputName, setInputName] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState<Date | undefined>(
    new Date(0)
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | undefined>(
    new Date(0)
  );
  const [selectedIntervalTime, setSelectedIntervalTime] = useState<
    Date | undefined
  >(new Date(0));
  const [selectedDurationTime, setSelectedDurationTime] = useState<
    Date | undefined
  >(new Date(0));

  useEffect(() => {
    setShape({
      name: inputName,
      start: formatHHMM(selectedStartTime!),
      end: formatHHMM(selectedEndTime!),
      duration: formatTimeInMinutes(selectedDurationTime!),
      interval: formatTimeInMinutes(selectedIntervalTime!),
    });
  }, [
    inputName,
    selectedDurationTime,
    selectedEndTime,
    selectedIntervalTime,
    selectedStartTime,
    setShape,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="">Name</Label>
        {/* <p>{formatHHMM(selectedStartTime!)}</p>
        <p>{formatHHMM(selectedEndTime!)}</p>
        <p>{formatTimeInMinutes(selectedDurationTime!)}</p>
        <p>{formatTimeInMinutes(selectedIntervalTime!)}</p> */}
        <span className="flex items-center gap-2">
          <Input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="mt-1 w-2/3"
          ></Input>
          <div className="flex items-center gap-1 flex-row-reverse text-green-500">
            {/* <p className="text-xs">Name exists</p> <Check /> */}
          </div>
        </span>
      </div>
      <div>
        <Label>Start</Label>
        <TimePickerTime
          date={selectedStartTime}
          setDate={setSelectedStartTime}
        />
      </div>
      <div>
        <Label>End</Label>
        <TimePickerTime date={selectedEndTime} setDate={setSelectedEndTime} />
      </div>
      <div>
        <Label>Duration</Label>
        <TimePickerTime
          noPeriod
          date={selectedDurationTime}
          setDate={setSelectedDurationTime}
        />
      </div>
      <div>
        <Label>Interval</Label>
        <TimePickerTime
          noPeriod
          date={selectedIntervalTime}
          setDate={setSelectedIntervalTime}
        />
      </div>
      <div className="mb-2"></div>
    </div>
  );
}

function formatTimeInMinutes(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 60 + minutes;
}
