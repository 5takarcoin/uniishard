import { useState } from "react";
import CalendarContainer from "./CalendarContainer";
import { Slider } from "@/components/ui/slider";
// import { CreateTable } from "./CreateTable";
import OneDay from "./OneDay";
import Hours from "./Hours";
// import { tableType } from "@/utils/types";
import { useProfileQuery } from "@/store/services/dataApi";
import { calcSlotDay, calculateSlots } from "@/utils/utils";

export default function Calendar({ ind }: { ind: number }) {
  const [numOfDays, setNumOfDays] = useState<number>(8);

  const { data } = useProfileQuery(undefined);
  const currTable = data?.user.tables[ind];
  const slots = currTable?.schema
    ? calculateSlots(currTable?.schema)["slots"]
    : [];

  return (
    <div className=" h-full w-full">
      {currTable?.schema?.name ? (
        <div className="space-y-4">
          <div>
            <Slider
              className="pb-4 mx-auto"
              defaultValue={[numOfDays]}
              min={6}
              max={40}
              step={1}
              onValueChange={(e) => setNumOfDays(e[0])}
            />
          </div>
          <div className="flex drop-shadow-md  justify-start bg-background ">
            {/* shadow-[inset_0_-100px_80px_rgba(255,255,255,0.03)] */}
            <div className="p-2 border rounded-l-md border-r-0">
              <Hours color={currTable.color} demo={slots} />
            </div>
            <div className=" flex-1 overflow-x-hidden">
              <CalendarContainer>
                {currTable.schema && (
                  <>
                    <div className="flex items-start gap-2 md">
                      {Array.from({ length: numOfDays }).map((_, i) => (
                        <OneDay
                          color={currTable.color}
                          ind={ind}
                          key={i}
                          day={calcSlotDay(i)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </CalendarContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {/* <Button className="p-8" variant={"outline"}>
            Create Table <Plus />
          </Button> */}
          <p>Meow</p>
          {/* <CreateTable /> */}
        </div>
      )}
      {/* {currTable?.schema?.name && <CreateTable change />} */}
    </div>
  );
}
