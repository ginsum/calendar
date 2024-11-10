import { weekDay } from "@/constant";
import CalendarMoveButton from "./CalendarMoveBtn";

export default function CalendarHeader() {
  return (
    <div className="flex flex-col w-full items-center justify-items-center gap-3">
      <CalendarMoveButton />
      <div className="flex w-full">
        {weekDay.map(({ id, text }) => (
          <div
            key={id}
            className="w-full flex justify-center p-0.5 border border-l-0 border-white text-zinc-500 bg-zinc-200 text-sm"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
