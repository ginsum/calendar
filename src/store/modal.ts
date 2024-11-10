import { RecruitContentType } from "@/type";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  contentList: RecruitContentType[] | null;
  date: string;
  index: number;
  clickedIds: number[];
}

interface ModalActionType {
  setIsOpen: (isOpen: boolean) => void;
  setContentList: (contentList: RecruitContentType[]) => void;
  setDate: (date: string) => void;
  setIndex: (index: number) => void;
  setModalInfo: ({
    sortList,
    index,
    date,
    id,
  }: {
    sortList: RecruitContentType[];
    index: number;
    date: string;
    id: number;
  }) => void;
  setCloseModal: () => void;
  setClickedIds: (clickedId: number) => void;
}

interface UseModalStoreType extends ModalState, ModalActionType {}

const useModalStore = create<UseModalStoreType>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  contentList: null,
  setContentList: (contentList) => set({ contentList }),
  date: "",
  setDate: (date) => set({ date }),
  index: 0,
  setIndex: (index) => set({ index }),
  setModalInfo: ({ sortList, index, date, id }) =>
    set((state) => ({
      contentList: sortList,
      index,
      date,
      clickedIds: [...new Set([...state.clickedIds, id])],
    })),
  setCloseModal: () =>
    set({ isOpen: false, contentList: null, index: 0, date: "" }),
  clickedIds: [],
  setClickedIds: (clickedId) =>
    set((state) => ({
      clickedIds: [...new Set([...state.clickedIds, clickedId])],
    })),
}));

export default useModalStore;
