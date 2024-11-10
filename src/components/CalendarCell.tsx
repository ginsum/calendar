import useModalStore from "@/store/modal";
import { RecruitContentType } from "@/type";

interface CalendarCellProps {
  day: string;
  date: string;
  list?: RecruitContentType[];
}

export default function CalendarCell({ day, date, list }: CalendarCellProps) {
  const { setOpenModal } = useModalStore();
  const sortList = list?.sort((a) => (a.isStart ? -1 : 0));

  return (
    <div className="w-[14.2857%] flex flex-col  border border-l-0 border-t-0 text-zinc-600 text-sm">
      <div className="flex justify-center py-0.5 border-b bg-zinc-50">
        {day}
      </div>
      <div className="flex flex-col p-2 gap-1">
        {sortList?.map((content, index) => (
          <div
            key={content.id}
            className="flex gap-2 cursor-pointer"
            onClick={() => setOpenModal(sortList, index, date)}
          >
            <div>{content.isStart ? "시" : "끝"}</div>
            <div>{content.company_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
