import CalendarContainer from "./CalendarContainer";
import { slotType, tableStyleType } from "@/utils/types";
import Hours from "./Hours";
import { calculateSlots } from "@/utils/utils";
import { SlotWeekly } from "./SlotWeekly";

export default function CalCal({
  currTable,
  setWeeklies,
}: {
  currTable: tableStyleType;
  setWeeklies: React.Dispatch<React.SetStateAction<slotType[]>>;
}) {
  const { slots, numSlots } = calculateSlots(currTable);
  return (
    <div className="flex flex-col">
      {currTable && (
        <div className="flex flex-col h-[420px] w-[610px] ">
          <CalendarContainer small>
            {currTable && (
              <>
                <Hours demo={slots} />
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
                      <div key={i}>
                        <div className="flex flex-col items-center justify-between gap-2">
                          <div className="w-32 text-center rounded-md p-2 border flex flex-col text">
                            <span>{day}</span>
                          </div>
                          {numSlots.map((num, index) => (
                            <div
                              key={index}
                              className="hover:bg-gray-800 w-32 rounded-md h-12 flex items-center justify-center"
                            >
                              <div className="w-full rounded-md h-12 border flex items-center justify-center">
                                <SlotWeekly
                                  day={i}
                                  dateStr={num}
                                  setWeeklies={setWeeklies}
                                />
                              </div>
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
