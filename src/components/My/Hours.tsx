import Slot from "./Slot";
import { useSelector } from "react-redux";
import { selectSlots } from "@/store/selectors/selector";
import { getContrastColor } from "@/lib/colorUtils";

export default function Hours({
  demo,
  color = "#000000",
}: {
  demo?: string[];
  color?: string;
}) {
  const { slots: sls } = useSelector(selectSlots);
  const slots = demo || sls;

  const textColor = getContrastColor(color);

  return (
    <div className="flex flex-col items-center justify-between gap-2">
      {/* Times */}
      <div
        style={{ backgroundColor: color, color: textColor }}
        className="text-xs md:text-base w-24 md:w-32 text-center rounded-md p-2 border"
      >
        Time
      </div>
      {slots.map((slot: string, i: number) => (
        <div
          key={i}
          style={{ backgroundColor: color, color: textColor }}
          className="rounded-md h-11 md:h-12 border flex items-center justify-center"
        >
          <Slot slot={slot} />
        </div>
      ))}
    </div>
  );
}
