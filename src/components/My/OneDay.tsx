import { SlotInput } from "./SlotInput";
import {
  calculateSlots,
  dateInNumber,
  dayFromToday,
  reshapeSlots,
} from "@/utils/utils";
import { useProfileQuery } from "@/store/services/dataApi";
import { getContrastColor } from "@/lib/colorUtils";

export default function OneDay({
  day,
  ind,
  color = "#000000",
}: {
  day: Date;
  ind: number;
  color?: string;
}) {
  const { data } = useProfileQuery(undefined);

  const currTable = data?.user.tables[ind];
  const { numSlots } = calculateSlots(currTable?.schema!);

  const rawSlots = data?.user?.tables[ind]?.slots;
  const rawWeeklies = data?.user?.tables[ind]?.weekly;

  const slots = reshapeSlots(rawSlots);
  const weeklies = reshapeSlots(rawWeeklies);

  const textColor = getContrastColor(color);

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-2">
        <div
          style={{ backgroundColor: color, color: textColor }}
          className="w-32 text-center rounded-md p-2 border flex flex-col text"
        >
          {/* <span>{Number(day)}</span> */}
          <p></p>
          {dayFromToday(day) < 7 ? (
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
          ) : (
            <span>{day.toLocaleDateString("en-GB")}</span>
          )}
        </div>
        {numSlots.map((slot: number, i: number) => (
          <div
            key={ind + "_" + i}
            className="hover:bg-gray-800 w-32 rounded-md h-12 flex items-center justify-center"
          >
            <div className="w-full rounded-md h-12 border flex items-center justify-center">
              <SlotInput
                ind={ind}
                color={color}
                exist={
                  slots
                    ? slots[Number(`${dateInNumber(day)}${slot}`)] ||
                      weeklies[`${day.getDay()}${slot}`]
                    : undefined
                }
                s={""}
                dateStr={Number(`${dateInNumber(day)}${slot}`)}
                date={day}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
