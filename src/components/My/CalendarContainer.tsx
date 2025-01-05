import React, { useContext, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SlotsContext } from "@/context/slotscontext";
import { SlotInput } from "./SlotInput";
import { tableType } from "@/App";
import { minFromMidnight, minutesToHHMM } from "@/utils/utils";

export default function CalendarContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  // function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
  //   // To Be Fixed
  //   // e.preventDefault();
  //   console.log(e);
  // }
  return (
    <ScrollArea
      // onWheel={(e) => handleScroll(e)}
      className="w-11/12 min-h-[300px] whitespace-nowrap rounded-md border"
    >
      <div className="flex min-h-[300px] w-full space-x-2 p-4">{children}</div>
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
  const { slots, slotsNum } = useContext(SlotsContext);
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
        {slotsNum.map((slot: number, i: number) => (
          <div
            key={i}
            className="hover:bg-gray-800 w-32 rounded-md h-12 border flex items-center justify-center"
          >
            <SlotInput date={day} slot={slot} s={slots[i]} />
          </div>
        ))}
      </div>
    </div>
  );
}

// function timeFromMidnight(mins: number) {
//   let hours = Math.floor(mins / 60);
//   let minutes = mins % 60;
//   return hours * 100 + minutes;
// }

function strTimeFromMidnight12(mins: number) {
  let hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const isPm = Math.floor(hours / 12) > 0;
  if (isPm) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${isPm ? "PM" : "AM"}`;
}

function Hours({ currTable }: { currTable: tableType }) {
  const { slots, setSlots, setSlotsNum } = useContext(SlotsContext);
  const { start, end, interval, duration } = currTable!;

  useEffect(() => {
    const startInMin = minFromMidnight(start);
    const endInMin = minFromMidnight(end);
    const numberOfSlots = (endInMin - startInMin) / (interval + duration);
    const tempSlots: string[] = [];
    const tempNumSlots: number[] = [];
    for (let i = 0; i < numberOfSlots; i++) {
      const timeSlot = `${strTimeFromMidnight12(
        startInMin + i * (interval + duration)
      )} to ${strTimeFromMidnight12(
        startInMin + (i + 1) * (interval + duration) - interval
      )}`;
      tempSlots.push(timeSlot);
      tempNumSlots.push(minutesToHHMM(startInMin + i * (interval + duration)));
    }
    setSlotsNum!(tempNumSlots);
    setSlots!(tempSlots);
  });
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
