interface CalendarCellProps {
  day: string;
  list: string[];
}

export default function CalendarCell({ day, list }: CalendarCellProps) {
  return (
    <div className="w-[14.2857%] flex flex-col justify-center border border-l-0 border-t-0 text-zinc-600">
      <div className="flex justify-center border-b-1">{day}</div>
      <div>body</div>
    </div>
  );
}
