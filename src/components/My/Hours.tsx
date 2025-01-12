import Slot from "./Slot";
import { useSelector } from "react-redux";
import { selectSlots } from "@/store/selectors/selector";

export default function Hours({ demo }: { demo?: string[] }) {
  const { slots: sls } = useSelector(selectSlots);
  let slots = null;
  if (demo) slots = demo;
  else slots = sls;
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      {/* Times */}
      <div className="w-32 text-center rounded-md p-2 border">Time</div>
      {slots.map((slot: string, i: number) => (
        <div
          key={i}
          className="rounded-md h-12 border flex items-center justify-center"
        >
          <Slot slot={slot} />
        </div>
      ))}
    </div>
  );
}
