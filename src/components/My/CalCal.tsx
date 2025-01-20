import CalendarContainer from "./CalendarContainer";
import { tableStyleType } from "@/utils/types";
import Hours from "./Hours";
import { calculateSlots } from "@/utils/utils";

export default function CalCal({ currTable }: { currTable: tableStyleType }) {
  const numSlots = calculateSlots(currTable)["slots"];

  return (
    <div className="flex flex-col">
      {currTable && (
        <div className="flex flex-col h-[420px] w-[610px] ">
          <CalendarContainer small>
            {currTable && (
              <>
                <Hours demo={numSlots} />
                <div className="flex items-start justify-between gap-2">
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day, i) => {
                    return (
                      <div>
                        <div className="flex flex-col items-center justify-between gap-2">
                          <div className="w-32 text-center rounded-md p-2 border flex flex-col text">
                            <span key={i}>{day}</span>
                          </div>
                          {numSlots.map((_, i) => (
                            <div
                              key={i}
                              className="hover:bg-gray-800 w-32 rounded-md h-12 flex items-center justify-center"
                            >
                              <div className="w-full rounded-md h-12 border flex items-center justify-center"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CalendarContainer>
        </div>
      )}
    </div>
  );
}
