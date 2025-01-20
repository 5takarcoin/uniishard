import { selectSlots } from "@/store/selectors/selector";
import { useSelector } from "react-redux";
import { SlotInput } from "./SlotInput";
import { dateInNumber, dayFromToday, reshapeSlots } from "@/utils/utils";
import { useProfileQuery } from "@/store/services/dataApi";
// import { SlotInput } from "./SlotInput";

export default function OneDay({ day }: { day: Date }) {
  const { numSlots } = useSelector(selectSlots);

  const { data } = useProfileQuery(undefined);
  const rawSlots = data?.user?.tables[0]?.slots;
  const slots = reshapeSlots(rawSlots);

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-32 text-center rounded-md p-2 border flex flex-col text">
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
            key={i}
            className="hover:bg-gray-800 w-32 rounded-md h-12 flex items-center justify-center"
          >
            <div className="w-full rounded-md h-12 border flex items-center justify-center">
              <SlotInput
                exist={
                  slots
                    ? slots[Number(`${dateInNumber(day)}${slot}`)]
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
