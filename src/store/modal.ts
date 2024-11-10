import { RecruitContentType } from "@/type";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  contentList: RecruitContentType[] | null;
  date: string;
  index: number;
}

interface ModalActionType {
  setIsOpen: (isOpen: boolean) => void;
  setContentList: (contentList: RecruitContentType[]) => void;
  setDate: (date: string) => void;
  setIndex: (index: number) => void;
  setOpenModal: (
    sortList: RecruitContentType[],
    index: number,
    date: string
  ) => void;
  setCloseModal: () => void;
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
  setOpenModal: (sortList, index, date) =>
    set({ isOpen: true, contentList: sortList, index, date }),
  setCloseModal: () =>
    set({ isOpen: false, contentList: null, index: 0, date: "" }),
}));

export default useModalStore;
