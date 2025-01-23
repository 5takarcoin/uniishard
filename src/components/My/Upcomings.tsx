import { useProfileQuery } from "@/store/services/dataApi";
import {
  dayFromToday,
  duplicateWeeklyObject,
  slotReshaper,
  weeklyReshaper,
} from "@/utils/utils";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { recType } from "@/utils/types";

export default function Upcomings() {
  const { data, refetch } = useProfileQuery(undefined);
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
      {arr.map((k, i) => (
        <div key={k + i}>
          {/*
           {new Date(Number(k.split("_")[0])).toLocaleDateString()}
          {" ----------------- "}
          {Number(k.split("_")[0])}
          {" ----------------- "} */}
          {/* {new Date(Number(k.split("_")[0].slice(0, 13))).toString} */}
          {dayFromToday(sp(k)) <= 7 && dayFromToday(sp(k)) >= 0 && (
            <div className="border p-2 w-96 flex justify-between">
              <p>{sp(k).toLocaleDateString("en-GB")}</p>
              <div>
                <p>{all && all[k]?.title}</p>
                {all && all[k]?.infos}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
