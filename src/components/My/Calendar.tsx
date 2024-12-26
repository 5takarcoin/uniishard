// import { Calendar as ShadCal } from "@/components/ui/calendar";
import { useState } from "react";
import CalendarContainer, { Hours, OneDay } from "./CalendarContainer";
import { Slider } from "@/components/ui/slider";

export default function Calendar() {
  // const [numOfWeeks, setNumOfWeeks] = useState<number>(1);
  const [numOfDays, setNumOfDays] = useState<number>(6);

  function calcSlotDay(i: number) {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return today;
  }

  return (
    <div className="flex flex-col">
      <Slider
        className="py-20 w-1/2 mx-auto"
        defaultValue={[numOfDays]}
        min={6}
        max={40}
        step={1}
        onValueChange={(e) => setNumOfDays(e[0])}
      />
      <div className="flex w-11/12 justify-center">
        <CalendarContainer>
          <Hours />
          <div className="flex items-start justify-between gap-2">
            {Array.from({ length: numOfDays }).map((_, i) => (
              // <OneWeek key={i} />
              <OneDay key={i} day={calcSlotDay(i)} />
            ))}
          </div>
        </CalendarContainer>
      </div>
    </div>
  );
}
