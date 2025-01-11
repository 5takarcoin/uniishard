import { useState } from "react";
import CalendarContainer from "./CalendarContainer";
import { Slider } from "@/components/ui/slider";
import { CreateTable } from "./CreateTable";
import OneDay from "./OneDay";
import Hours from "./Hours";
// import { tableType } from "@/utils/types";
import { useProfileQuery } from "@/store/services/dataApi";

export default function Calendar() {
  const [numOfDays, setNumOfDays] = useState<number>(6);
  function calcSlotDay(i: number) {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return today;
  }

  const { data } = useProfileQuery(undefined);

  const currTable = data.user.currTable;

  return (
    <div className="flex flex-col">
      <p>{currTable.schema?.name}</p>
      {currTable.schema?.name ? (
        <div className="flex flex-col w-11/12 justify-center ">
          <Slider
            className="py-20 w-1/2 mx-auto"
            defaultValue={[numOfDays]}
            min={6}
            max={40}
            step={1}
            onValueChange={(e) => setNumOfDays(e[0])}
          />
          {/* <h3 className="text-2xl">{currTable.schema.name}</h3> */}
          <CalendarContainer>
            {currTable.schema && (
              <>
                <Hours currTable={currTable.schema} />
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
      {currTable.schema?.name && <CreateTable change />}
    </div>
  );
}
