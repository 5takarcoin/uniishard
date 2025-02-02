import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
import { Period } from "./time-picker-utils";
import { TimePeriodSelect } from "./period-select";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  noPeriod?: boolean;
}

export function TimePickerTime({
  date,
  setDate,
  noPeriod,
}: TimePickerDemoProps) {
  const [period, setPeriod] = useState<Period>("AM");

  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center gap-2">
      <div className="grid text-center">
        <Label
          htmlFor="hours"
          className="text-xs text-gray-600 hidden md:block"
        >
          Hours
        </Label>
        <TimePickerInput
          picker={noPeriod ? "hours" : "12hours"}
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid text-center">
        <Label
          htmlFor="minutes"
          className="text-xs text-gray-600 hidden md:block"
        >
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>

      {!noPeriod && (
        <div className="grid text-center">
          <Label
            htmlFor="period"
            className="h-[1rem] text-xs text-gray-600 hidden md:block"
          ></Label>
          <TimePeriodSelect
            period={period}
            setPeriod={setPeriod}
            date={date}
            setDate={setDate}
            ref={periodRef}
            onLeftFocus={() => secondRef.current?.focus()}
          />
        </div>
      )}
    </div>
  );
}
