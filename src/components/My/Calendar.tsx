// import { Calendar as ShadCal } from "@/components/ui/calendar";
import { useState } from "react";
import CalendarContainer, { Hours, OneWeek } from "./CalendarContainer";
import { Slider } from "@/components/ui/slider";

export default function Calendar() {
  const [numOfWeeks, setNumOfWeeks] = useState<number>(1);

  return (
    <div className="flex flex-col">
      <Slider
        className="py-20 w-1/2 mx-auto"
        defaultValue={[numOfWeeks]}
        min={1}
        max={4}
        step={1}
        onValueChange={(e) => setNumOfWeeks(e[0])}
      />
      <div className="flex w-11/12 justify-center">
        <CalendarContainer>
          <Hours />
          {Array.from({ length: numOfWeeks }).map((_, i) => (
            <OneWeek key={i} />
          ))}
        </CalendarContainer>
      </div>
    </div>
  );
}
