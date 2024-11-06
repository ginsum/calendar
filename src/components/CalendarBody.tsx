"use client";

import { generatorCalendar } from "@/util";
import CalendarCell from "./CalendarCell";

export default function CalendarBody() {
  const currentMonthDays = generatorCalendar(2024)[10];

  return (
    <div className="flex flex-col w-full items-center justify-items-center gap-3">
      <div className="flex w-full flex-wrap">
        {currentMonthDays.map(({ month, day }, index) => (
          <CalendarCell
            key={`${month}-${day}`}
            day={day.toLocaleString()}
            list={["you"]}
          />
        ))}
      </div>
    </div>
  );
}
