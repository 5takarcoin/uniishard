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
    <div className="max-w-[900px] max-h-full whitespace-nowrap rounded-md border">
      <div className="flex">
        <ScrollArea
          // onWheel={(e) => handleScroll(e)}
          className="max-h-[600px] max-w-full whitespace-nowrap p-2"
        >
          <div className="flex space-x-2">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
