import { useContext, useEffect } from "react";
import { SlotsContext } from "@/context/slotscontext";
import { tableStyleType } from "@/utils/types";
import {
  minFromMidnight,
  minutesToHHMM,
  strTimeFromMidnight12,
} from "@/utils/utils";
import Slot from "./Slot";

export default function Hours({ currTable }: { currTable: tableStyleType }) {
  const { slots, setSlots, setSlotsNum } = useContext(SlotsContext);
  const { start, end, interval, duration } = currTable!;

  useEffect(() => {
    const startInMin = minFromMidnight(start);
    const endInMin = minFromMidnight(end);
    let t = interval + duration;
    if (interval + duration === 0) t = 1;
    const numberOfSlots = (endInMin - startInMin) / t;
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
