"use client";

import useDateStore from "@/store/date";
import useGetRecruits from "@/query/useGetRecruits";
import { generatorCalendar } from "@/lib/util";
import CalendarCell from "./CalendarCell";
import ModalContainer from "../modal/ModalContainer";

export default function CalendarBody() {
  const { year, month } = useDateStore();

  const currentMonthDays = generatorCalendar(year)[month];

  const { data, isPending } = useGetRecruits();

  return (
    <div className="flex flex-col w-full items-center justify-items-center gap-3">
      <div className="flex w-full flex-wrap">
        {currentMonthDays.map(({ date, day }) => (
          <CalendarCell
            key={date}
            day={day.toLocaleString()}
            date={date}
            list={(data && data[date]) || []}
            isPending={isPending}
          />
        ))}
      </div>
      <ModalContainer data={data} />
    </div>
  );
}
