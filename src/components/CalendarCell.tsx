import useModalStore from "@/store/modal";
import { RecruitContentType } from "@/type";

interface CalendarCellProps {
  day: string;
  date: string;
  list?: RecruitContentType[];
}

export default function CalendarCell({ day, date, list }: CalendarCellProps) {
  const { setModalInfo, setIsOpen, clickedIds } = useModalStore();
  const sortList: RecruitContentType[] =
    list?.sort((a) => (a.isStart ? -1 : 0)) || [];

  return (
    <div className="w-[14.2857%] flex flex-col  border border-l-0 border-t-0 text-zinc-600 text-sm">
      <div className="flex justify-center py-0.5 border-b bg-zinc-50">
        {day}
      </div>
      <div className="flex flex-col p-2 gap-1">
        {sortList?.map((content, index) => (
          <div
            key={content.id}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setModalInfo({ sortList, index, date, id: content.id });
              setIsOpen(true);
            }}
          >
            {content.isStart ? (
              <div className="flex justify-center items-center w-4 h-4 rounded bg-red-400 text-white text-xs">
                시
              </div>
            ) : (
              <div className="flex justify-center items-center w-4 h-4 rounded bg-zinc-400 text-white text-xs">
                끝
              </div>
            )}
            <div
              className={`w-full whitespace-nowrap text-ellipsis overflow-hidden ${
                clickedIds.includes(content.id)
                  ? "text-zinc-400"
                  : "text-zinc-900"
              }`}
            >
              {content.company_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
