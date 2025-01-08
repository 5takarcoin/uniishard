// import { SlotInput } from "./SlotInput";

export default function OneDay({ day }: { day: Date }) {
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
        {/* {slotsNum.map((slot: number, i: number) => (
          <div
            key={i}
            className="hover:bg-gray-800 w-32 rounded-md h-12 border flex items-center justify-center"
          >
            <SlotInput date={day} slot={slot} s={slots[i]} />
          </div>
        ))} */}
      </div>
    </div>
  );
}
