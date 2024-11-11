import DutyFilter from "./DutyFilter";

export default function DutyFilterContainer() {
  return (
    <div className="flex flex-col">
      <div className="text-lg text-zinc-500 py-2">직무</div>
      <DutyFilter />
    </div>
  );
}
