import { useNewSlotMutation, useProfileQuery } from "@/store/services/dataApi";
import {
  dateInNumber,
  dayFromToday,
  duplicateWeeklyObject,
  slotReshaper,
  weeklyReshaper,
} from "@/utils/utils";
import { Check, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { recType } from "@/utils/types";
import { priorityConv } from "@/utils/data";
import { useState } from "react";
// import { getContrastColor } from "@/lib/colorUtils";

export default function Upcomings({ ar }: { ar: number[] }) {
  const { data, refetch } = useProfileQuery(undefined);

  const [newSlot] = useNewSlotMutation();

  const processed: recType | undefined = data?.user.tables
    .map((d) => slotReshaper(d.slots))
    .reduce((acc, obj, index) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          acc[`${key}_${index}`] = obj[key];
        }
      }
      return acc;
    }, {});

  let processedW: recType | undefined = data?.user.tables
    .map((d) => weeklyReshaper(d.weekly))
    .reduce((acc, obj, index) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          acc[`${key}_${index}`] = obj[key];
        }
      }
      return acc;
    }, {});
  processedW = duplicateWeeklyObject({ ...processedW });

  const [all, setAll] = useState({ ...processedW, ...processed });
  // const all = { ...processedW, ...processed };

  const arr = Object.keys(all);

  const sp = (k: string) => {
    const m = new Date(Number(k.split("_")[0].slice(0, 13)));
    return m;
  };

  const check = (arr: string[], s: string) => {
    return arr.filter((task) => {
      // console.log(
      //   `${task} er jonno ${
      //     (task[0] === "D" && dayFromToday(sp(s)) <= 7) ||
      //     (task[0] === "G" && dayFromToday(sp(s)) <= 3) ||
      //     (task[0] === "S" && dayFromToday(sp(s)) <= 1) ||
      //     (task[0] === "N" && dayFromToday(sp(s)) == 0)
      //   } ${dayFromToday(sp(s))}`
      // );

      return (
        (task[0] === "D" && dayFromToday(sp(s)) <= 10) ||
        (task[0] === "G" && dayFromToday(sp(s)) <= 3) ||
        (task[0] === "S" && dayFromToday(sp(s)) <= 2) ||
        (task[0] === "N" && dayFromToday(sp(s)) <= 1)
      );
    });
  };

  return (
    <div className=" border-transparent">
      <div className="-translate-y-4">
        <Button variant={"ghost"} onClick={refetch}>
          <RefreshCcw />
        </Button>
      </div>
      <div className="flex flex-col">
        {arr.map((k, een) => (
          <div key={k + "top" + een} className="">
            {dayFromToday(sp(k)) >= 0 &&
              check(all[k]?.infos, k).length > 0 &&
              ar[Number(k.split("_")[1])] !== 0 && (
                <div
                  style={{
                    borderColor:
                      data?.user.tables[Number(k.split("_")[1])]?.color,
                    // color: getContrastColor(
                    //   data?.user.tables[Number(k.split("_")[1])]?.color || ""
                    // ),
                  }}
                  className="border mb-2 p-2 w-96 flex items-center justify-between px-4 rounded-sm"
                >
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex items-center gap-4 w-full">
                      <p
                        style={{
                          color:
                            data?.user.tables[Number(k.split("_")[1])]?.color,
                        }}
                        className="font-bold py-2"
                      >
                        {all && all[k]?.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        {sp(k).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    {check(all[k]?.infos, k).map((task, i) => (
                      <div
                        key={k + een + i}
                        className="flex justify-between pb-2"
                      >
                        <div className="flex gap-2 items-center">
                          <Button
                            onClick={async () => {
                              const newAll = { ...all };
                              const updated = `${task[0]}${
                                task[1] === "1" ? "0" : "1"
                              }${task.substring(2)}`;
                              newAll[k].infos = [
                                ...newAll[k].infos.map((k, ind) =>
                                  i === ind ? updated : k
                                ),
                              ];
                              console.log("figure out  ", k);
                              setAll(newAll);

                              await newSlot({
                                body: {
                                  title: all[k]?.title,
                                  infos: newAll[k].infos,
                                  date:
                                    dateInNumber(sp(k)) +
                                    k.split("_")[0].substring(13),
                                },
                                id: data?.user.tables[Number(k.split("_")[1])]
                                  ?._id,
                              });
                            }}
                            variant={"ghost"}
                            className={`h-8 w-8 rounded-full border 
                            ${
                              task[1] === "1" &&
                              "bg-green-600 hover:bg-green-500"
                            }
                            `}
                          >
                            {task[1] === "1" && <Check />}
                          </Button>
                          <p
                            className={
                              task[1] === "1" ? " line-through opacity-20" : ""
                            }
                            style={
                              task[0] === "N"
                                ? {}
                                : {
                                    color: priorityConv[task[0]]?.[1],
                                  }
                            }
                          >
                            {task.substring(2)}
                          </p>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                          <div
                            style={{
                              backgroundColor: priorityConv[task[0]]?.[1],
                            }}
                            className={`h-4 w-4 ${
                              task[0] === "N" && "border border-[#dddddd]"
                            } rounded-full`}
                          ></div>
                          <span
                            style={{
                              color:
                                task[0] === "N"
                                  ? "#dddddd"
                                  : priorityConv[task[0]]?.[1],
                            }}
                          >
                            {priorityConv[task[0]]?.[0]}
                          </span>{" "}
                          {/* <p>{priorityConv[task[0]]?.[0]}</p> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
