export default function DutyFilterChip({
  onClick,
  name,
  checked,
}: {
  onClick: () => void;
  name: string;
  checked: boolean;
}) {
  return (
    <div
      className={`flex h-10 px-3 py-2 border rounded-2xl cursor-pointer ${
        checked ? "bg-zinc-300" : "bg-white"
      }`}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
