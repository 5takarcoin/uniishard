export default function Slot({ slot }: { slot: string }) {
  return (
    <div className="w-24 md:w-32 text-[10px] md:text-xs  text-center p-2">
      <div>{slot.split(" to ")[0]}</div>
      {/* <div>-</div> */}
      <div>{slot.split(" to ")[1]}</div>
    </div>
  );
}
