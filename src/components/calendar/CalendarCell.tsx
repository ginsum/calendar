import useModalStore from "@/store/modal";
import { RecruitContentType } from "@/type";

interface CalendarCellProps {
  day: string;
  date: string;
  list?: RecruitContentType[];
  isPending: boolean;
}

const arr = Array(5).fill(0);

export default function CalendarCell({
  day,
  date,
  list,
  isPending,
}: CalendarCellProps) {
  const { setModalInfo, setIsOpen, clickedIds } = useModalStore();

  list?.sort((a, b) => {
    if (a.isStart && !b.isStart) return -1;
    if (!a.isStart && b.isStart) return 1;
    return 0;
  });

  return (
    <div className="w-[14.2857%] min-h-[180px] flex flex-col  border border-l-0 border-t-0 text-zinc-600 text-sm">
      <div className="flex justify-center py-0.5 border-b bg-zinc-50">
        {day}
      </div>
      {isPending && (
        <div className="flex flex-col w-full p-2 gap-2">
          {arr.map((_el, index) => (
            <div key={index} className="h-4 bg-zinc-100 rounded"></div>
          ))}
        </div>
      )}
      <div className="flex flex-col p-2 gap-1">
        {list?.map((content, index) => (
          <div
            key={content.id}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setModalInfo({
                sortList: list,
                index,
                date,
                id: content.id,
              });
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
