// import { Calendar as ShadCal } from "@/components/ui/calendar";
import { useContext, useState } from "react";
import CalendarContainer, { Hours, OneDay } from "./CalendarContainer";
import { Slider } from "@/components/ui/slider";
// import { Button } from "../ui/button";
// import { Plus } from "lucide-react";
import { CreateTable } from "./CreateTable";
// import { SlotsContext } from "@/context/slotscontext";
import { tableType } from "@/App";
import { SlotsContext } from "@/context/slotscontext";

export default function Calendar() {
  // const [numOfWeeks, setNumOfWeeks] = useState<number>(1);
  const [numOfDays, setNumOfDays] = useState<number>(6);
  const { currTable } = useContext(SlotsContext);
  function calcSlotDay(i: number) {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return today;
  }

  return (
    <div className="flex flex-col">
      {currTable ? (
        <div className="flex flex-col w-11/12 justify-center ">
          <Slider
            className="py-20 w-1/2 mx-auto"
            defaultValue={[numOfDays]}
            min={6}
            max={40}
            step={1}
            onValueChange={(e) => setNumOfDays(e[0])}
          />
          <h3 className="text-2xl">{currTable.name}</h3>
          <CalendarContainer>
            {currTable && (
              <>
                <Hours currTable={currTable} />
                <div className="flex items-start justify-between gap-2">
                  {Array.from({ length: numOfDays }).map((_, i) => (
                    // <OneWeek key={i} />
                    <OneDay key={i} day={calcSlotDay(i)} />
                  ))}
                </div>
              </>
            )}
          </CalendarContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          {/* <Button className="p-8" variant={"outline"}>
            Create Table <Plus />
          </Button> */}
          <CreateTable />
        </div>
      )}
      <CreateTable />
    </div>
  );
}

export function CalCal({ currTable }: { currTable: tableType }) {
  // const [numOfWeeks, setNumOfWeeks] = useState<number>(1);
  // const { currTable } = useContext(SlotsContext);

  function calcSlotDay(i: number) {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return today;
  }

  return (
    <div className="flex flex-col">
      {currTable?.name && (
        <div className="flex flex-col w-[600px] justify-center ">
          <CalendarContainer>
            <>
              <Hours currTable={currTable} />
              <div className="flex items-start justify-between gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  // <OneWeek key={i} />
                  <OneDay key={i} day={calcSlotDay(i)} />
                ))}
              </div>
            </>
          </CalendarContainer>
        </div>
      )}
    </div>
  );
}
