export default function DutyFilterBox({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex p-2 gap-2 hover:bg-zinc-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
