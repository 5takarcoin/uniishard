import CalendarContainer from "./CalendarContainer";
import { tableStyleType } from "@/utils/types";
import OneDay from "./OneDay";
import Hours from "./Hours";

export default function CalCal({ currTable }: { currTable: tableStyleType }) {
  function calcSlotDay(i: number) {
    const today = new Date();
    today.setDate(today.getDate() + i);
    return today;
  }

  return (
    <div className="flex flex-col">
      {currTable && (
        <div className="flex flex-col w-[600px] justify-center ">
          <CalendarContainer>
            <>
              <Hours currTable={currTable} />
              <div className="flex items-start justify-between gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  // <OneWeek key={i} />
                  <OneDay key={i} day={calcSlotDay(i)} />
                ))}
              </div>
            </>
          </CalendarContainer>
        </div>
      )}
    </div>
  );
}
