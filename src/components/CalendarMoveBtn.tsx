interface CalendarMoveButtonProps {
  year: string;
  month: string;
}

export default function CalendarMoveButton({
  year,
  month,
}: CalendarMoveButtonProps) {
  return (
    <div className="flex p-2 gap-3">
      <div>+</div>
      <div className="flex gap-1 text-xl font-bold text-red-400">
        <div>{year}</div>
        <div>.</div>
        <div>{month}</div>
      </div>

      <div>+</div>
    </div>
  );
}
