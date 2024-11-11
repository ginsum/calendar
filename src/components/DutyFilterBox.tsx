export default function DutyFilterBox({
  onClick,
  isSelected,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
  isSelected: boolean;
}) {
  return (
    <div
      className={`flex p-2 gap-2 hover:bg-zinc-200 cursor-pointer ${
        isSelected ? "bg-zinc-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
