import React, { useContext, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SlotsContext } from "@/context/slotscontext";
import { SlotInput } from "./SlotInput";

export default function CalendarContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ScrollArea className="w-11/12 h-[400px] whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-2 p-4">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function OneWeek() {
  return (
    <div className="flex items-start justify-between gap-2">
      {/* <OneDay day="Sun" />
      <OneDay day="Mon" />
      <OneDay day="Tue" />
      <OneDay day="Wed" />
      <OneDay day="Thu" />
      <OneDay day="Fri" />
      <OneDay day="Sat" /> */}
    </div>
  );
}

function OneDay({ day }: { day: Date }) {
  const { slots } = useContext<any>(SlotsContext);
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-32 text-center rounded-md p-2 border flex flex-col text">
          {/* <span>{day.toLocaleDateString("en-GB")}</span> */}
          {/* <span>{Number(day)}</span> */}
          <span>
            {
              [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ][day.getDay()]
            }
          </span>
        </div>
        {slots.map((_: string, i: number) => (
          <div
            key={i}
            className="hover:bg-gray-800 w-32 rounded-md h-12 border flex items-center justify-center"
          >
            <SlotInput date={day} />
          </div>
        ))}
      </div>
    </div>
  );
}

function minFromMidnight(time: number) {
  let hours = Math.floor(time / 100);
  let mins = time % 100;
  return hours * 60 + mins;
}

// function timeFromMidnight(mins: number) {
//   let hours = Math.floor(mins / 60);
//   let minutes = mins % 60;
//   return hours * 100 + minutes;
// }

function strTimeFromMidnight12(mins: number) {
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  let isPm = Math.floor(hours / 12) > 0;
  if (isPm) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${isPm ? "PM" : "AM"}`;
}

function Hours({
  start = 800,
  end = 1650,
  interval = 10,
  one = 80,
}: {
  start?: number;
  end?: number;
  interval?: number;
  one?: number;
}) {
  const { slots, setSlots } = useContext<any>(SlotsContext);

  useEffect(() => {
    let startInMin = minFromMidnight(start);
    let endInMin = minFromMidnight(end);
    let numberOfSlots = (endInMin - startInMin) / (interval + one);
    let tempSlots: string[] = [];
    for (let i = 0; i < numberOfSlots; i++) {
      let timeSlot = `${strTimeFromMidnight12(
        startInMin + i * (interval + one)
      )} to ${strTimeFromMidnight12(startInMin + (i + 1) * (interval + one))}`;
      tempSlots.push(timeSlot);
    }
    setSlots(tempSlots);
  }, []);
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="w-32 text-center rounded-md p-2 border">Time</div>
      {slots.map((slot: string, i: number) => (
        <div
          key={i}
          className="rounded-md h-12 border flex items-center justify-center"
        >
          <Slot slot={slot} />
        </div>
      ))}
    </div>
  );
}

function Slot({ slot }: { slot: string }) {
  return (
    <div className="w-32 text-xs text-center p-2">
      <div>{slot.split(" to ")[0]}</div>
      {/* <div>-</div> */}
      <div>{slot.split(" to ")[1]}</div>
    </div>
  );
}

export { OneWeek, Hours, OneDay };
