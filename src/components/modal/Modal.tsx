import { useEffect, useRef } from "react";
import Image from "next/image";
import useModalStore from "@/store/modal";
import { formattedDate, moveDate } from "@/lib/util";
import { RecruitDataType } from "@/type";

export default function Modal({ data }: { data: RecruitDataType }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    contentList,
    date,
    index,
    setCloseModal,
    setIndex,
    setClickedIds,
    setModalInfo,
  } = useModalStore();
  const onClose = () => setCloseModal();
  const content = contentList && contentList[index];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        leftButtonRef.current &&
        rightButtonRef.current &&
        !modalRef.current.contains(event.target as HTMLElement) &&
        !leftButtonRef.current.contains(event.target as HTMLElement) &&
        !rightButtonRef.current.contains(event.target as HTMLElement)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const onClickNextButton = () => {
    if ((contentList || []).length - 1 > index) {
      setIndex(index + 1);
      if (contentList) setClickedIds(contentList[index + 1]?.id || 0);
    } else {
      let newDate = "";
      let plusDay = 1;

      while (!newDate && plusDay < 30) {
        const nextDate = moveDate(date, plusDay);
        if (data[nextDate]) {
          newDate = nextDate;
        } else {
          plusDay += 1;
        }
      }
      if (newDate) {
        setModalInfo({
          sortList: data[newDate],
          index: 0,
          date: newDate,
          id: data[newDate][0]?.id || 0,
        });
      }
    }
  };

  const onClickPreviousButton = () => {
    if (index > 0) {
      setIndex(index - 1);
      if (contentList) setClickedIds(contentList[index - 1]?.id || 0);
    } else {
      let newDate = "";
      let minusDay = -1;

      while (!newDate && minusDay > -30) {
        const nextDate = moveDate(date, minusDay);
        if (data[nextDate]) {
          newDate = nextDate;
        } else {
          minusDay -= 1;
        }
      }

      if (newDate) {
        setModalInfo({
          sortList: data[newDate],
          index: data[newDate].length - 1,
          date: newDate,
          id: data[newDate][data[newDate].length - 1]?.id || 0,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-between">
      <button ref={rightButtonRef} onClick={onClickPreviousButton}>
        <Image
          src="/arrow-left.svg"
          alt="previous button"
          width={40}
          height={40}
          priority
        />
      </button>
      <div
        ref={modalRef}
        className="flex flex-col px-6 pt-6 pb-8 border w-[960px] h-[800px] shadow-lg rounded-md bg-white overflow-scroll"
      >
        <div className="flex w-full justify-end">
          <button className="text-xl text-zinc-400" onClick={onClose}>
            X
          </button>
        </div>

        <div className="text-zinc-800 px-7">
          <div className="text-2xl font-bold mb-2">{content?.company_name}</div>
          <h3 className="text-3xl font-bold mb-1">{content?.title}</h3>
          <div className="text-base text-zinc-600">{`${formattedDate(
            content?.start_time || ""
          )} ~ ${formattedDate(content?.end_time || "")}`}</div>
          <div className="mt-8 py-3">
            <img src={content?.image_url} alt="채용공고" />
          </div>
        </div>
      </div>
      <button ref={leftButtonRef} onClick={onClickNextButton}>
        <Image
          src="/arrow-right.svg"
          alt="next button"
          width={40}
          height={30}
          priority
        />
      </button>
    </div>
  );
}
