import { useProfileQuery } from "@/store/services/dataApi";
import {
  dayFromToday,
  duplicateWeeklyObject,
  slotReshaper,
  weeklyReshaper,
} from "@/utils/utils";
import { Check, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { recType } from "@/utils/types";
import { priorityConv } from "@/utils/data";
// import { getContrastColor } from "@/lib/colorUtils";

export default function Upcomings() {
  const { data, refetch } = useProfileQuery(undefined);
  const str = priorityConv["D"];
  console.log(str[1]);
  const processed: recType | undefined = data?.user.tables
    .map((d) => slotReshaper(d.slots))
    .reduce((acc, obj, index) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          acc[`${key}_${index}`] = obj[key];
        }
      }
      return acc;
    }, {});

  let processedW: recType | undefined = data?.user.tables
    .map((d) => weeklyReshaper(d.weekly))
    .reduce((acc, obj, index) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          acc[`${key}_${index}`] = obj[key];
        }
      }
      return acc;
    }, {});
  processedW = duplicateWeeklyObject({ ...processedW });
  const all = { ...processedW, ...processed };

  const arr = Object.keys(all);
  console.log(processedW);

  const sp = (k: string) => {
    const m = new Date(Number(k.split("_")[0].slice(0, 13)));
    return m;
  };

  return (
    <div>
      <div>
        <Button variant={"ghost"} onClick={refetch}>
          <RefreshCcw />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {arr.map((k, i) => (
          <div key={k + i} className="">
            {/*
           {new Date(Number(k.split("_")[0])).toLocaleDateString()}
           {" ----------------- "}
           {Number(k.split("_")[0])}
           {" ----------------- "} */}
            {/* {new Date(Number(k.split("_")[0].slice(0, 13))).toString} */}
            {dayFromToday(sp(k)) <= 7 && dayFromToday(sp(k)) >= 0 && (
              <div
                style={{
                  borderColor:
                    data?.user.tables[Number(k.split("_")[1])]?.color,
                  // color: getContrastColor(
                  //   data?.user.tables[Number(k.split("_")[1])]?.color || ""
                  // ),
                }}
                className="border p-2 w-96 flex items-center justify-between px-4 rounded-sm"
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
                  {all &&
                    all[k]?.infos.map((task, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <Button
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
                          <p>{task.substring(2)}</p>
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
