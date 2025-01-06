import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CalendarContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  // function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
  //   // To Be Fixed
  //   // e.preventDefault();
  //   console.log(e);
  // }
  return (
    <ScrollArea
      // onWheel={(e) => handleScroll(e)}
      className="w-11/12 min-h-[300px] whitespace-nowrap rounded-md border"
    >
      <div className="flex min-h-[300px] w-full space-x-2 p-4">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
