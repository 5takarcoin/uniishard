import { TimePickerTime } from "@/components/ui/timepicker/time-test";
import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
// import { SlotsContext } from "@/context/slotscontext";
import { formatHHMM, formatTimeInMinutes } from "@/utils/utils";
import { tableStyleType } from "@/utils/types";

export default function NewSchema({
  setShape,
}: {
  setShape: React.Dispatch<React.SetStateAction<tableStyleType>>;
}) {
  const [inputName, setInputName] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState<Date | undefined>(
    new Date(0)
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | undefined>(
    new Date(0)
  );
  const [selectedIntervalTime, setSelectedIntervalTime] = useState<
    Date | undefined
  >(new Date(0));
  const [selectedDurationTime, setSelectedDurationTime] = useState<
    Date | undefined
  >(new Date(0));

  useEffect(() => {
    setShape({
      name: inputName,
      start: formatHHMM(selectedStartTime!),
      end: formatHHMM(selectedEndTime!),
      duration: formatTimeInMinutes(selectedDurationTime!),
      interval: formatTimeInMinutes(selectedIntervalTime!),
    });
  }, [
    inputName,
    selectedDurationTime,
    selectedEndTime,
    selectedIntervalTime,
    selectedStartTime,
    setShape,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="">Name</Label>
        {/* <p>{formatHHMM(selectedStartTime!)}</p>
          <p>{formatHHMM(selectedEndTime!)}</p>
          <p>{formatTimeInMinutes(selectedDurationTime!)}</p>
          <p>{formatTimeInMinutes(selectedIntervalTime!)}</p> */}
        <span className="flex items-center gap-2">
          <Input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="mt-1"
          ></Input>
          <div className="flex items-center gap-1 flex-row-reverse text-green-500">
            {/* <p className="text-xs">Name exists</p> <Check /> */}
          </div>
        </span>
      </div>
      <div className="flex md:flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 md:block justify-between">
            <Label className="">Start</Label>
            <TimePickerTime
              date={selectedStartTime}
              setDate={setSelectedStartTime}
            />
          </div>

          <div className="flex items-center gap-2 md:block justify-between">
            <Label className="">End</Label>
            <TimePickerTime
              date={selectedEndTime}
              setDate={setSelectedEndTime}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 md:block justify-between">
            <Label className="">Duration</Label>
            <TimePickerTime
              noPeriod
              date={selectedDurationTime}
              setDate={setSelectedDurationTime}
            />
          </div>

          <div className="flex items-center gap-2 md:block justify-between">
            <Label className="">Interval</Label>
            <TimePickerTime
              noPeriod
              date={selectedIntervalTime}
              setDate={setSelectedIntervalTime}
            />
          </div>
        </div>
      </div>
      <div className="mb-2"></div>
    </div>
  );
}
