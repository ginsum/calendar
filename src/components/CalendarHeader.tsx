import { weekDay } from "@/constant";
import CalendarMoveButton from "./CalendarMoveBtn";

export default function CalendarHeader() {
  return (
    <div className="flex flex-col w-full items-center justify-items-center gap-3">
      <CalendarMoveButton year={"2024"} month={"11"} />
      <div className="flex w-full">
        {weekDay.map(({ id, text }) => (
          <div
            key={id}
            className="w-full flex justify-center border border-l-0 text-zinc-600"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
