import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CalendarContainer({
  children,
  small,
}: {
  children?: React.ReactNode;
  small?: boolean;
}) {
  // function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
  //   // To Be Fixed
  //   // e.preventDefault();
  //   console.log(e);
  // }
  return (
    <div className="whitespace-nowrap rounded-r-md border">
      <div className="flex">
        <ScrollArea
          // onWheel={(e) => handleScroll(e)}
          className={`${small ? "max-h-[400px]" : ""} whitespace-nowrap p-2`}
        >
          <div className="flex space-x-2 mb-2 mr-2">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
