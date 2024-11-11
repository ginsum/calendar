"use client";

import Image from "next/image";
import useDateStore from "@/store/date";
import { padStartNum } from "@/lib/util";

export default function CalendarMoveButton() {
  const { year, month, setYear, setMonth } = useDateStore();

  const onClickPreviousButton = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
  };

  const onClickNextButton = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
  };

  return (
    <div className="flex items-center p-2 gap-3 mt-4">
      <button onClick={onClickPreviousButton}>
        <Image
          src="/arrow-left.svg"
          alt="previous button"
          width={12}
          height={12}
          priority
        />
      </button>
      <div className="flex gap-1 text-xl font-bold text-red-400">
        <div className="w-14">{year}</div>
        <div>.</div>
        <div className="w-6">{padStartNum(month)}</div>
      </div>
      <button onClick={onClickNextButton}>
        <Image
          src="/arrow-right.svg"
          alt="next button"
          width={12}
          height={12}
          priority
        />
      </button>
    </div>
  );
}
