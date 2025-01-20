import { useState } from "react";
import CalendarContainer from "./CalendarContainer";
import { Slider } from "@/components/ui/slider";
import { CreateTable } from "./CreateTable";
import OneDay from "./OneDay";
import Hours from "./Hours";
// import { tableType } from "@/utils/types";
import { useProfileQuery } from "@/store/services/dataApi";
import { calcSlotDay } from "@/utils/utils";

export default function Calendar() {
  const [numOfDays, setNumOfDays] = useState<number>(8);

  const { data } = useProfileQuery(undefined);
  console.log(data?.user.tables[0]);
  const currTable = data?.user.tables[0];

  return (
    <div className="">
      {currTable?.schema?.name ? (
        <div className="flex flex-col justify-center">
          <CalendarContainer>
            {currTable.schema && (
              <>
                <Hours />
                <div className="flex items-start justify-between gap-2">
                  {Array.from({ length: numOfDays }).map((_, i) => (
                    <OneDay key={i} day={calcSlotDay(i)} />
                  ))}
                </div>
              </>
            )}
          </CalendarContainer>
          <Slider
            className="py-4 mx-auto"
            defaultValue={[numOfDays]}
            min={6}
            max={40}
            step={1}
            onValueChange={(e) => setNumOfDays(e[0])}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {/* <Button className="p-8" variant={"outline"}>
            Create Table <Plus />
          </Button> */}
          <CreateTable />
        </div>
      )}
      {currTable?.schema?.name && <CreateTable change />}
    </div>
  );
}
