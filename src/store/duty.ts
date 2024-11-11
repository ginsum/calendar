import { create } from "zustand";

interface DutyState {
  checkedIds: number[];
  selectedFirstDuty: number;
  selectedSecondDuty: number;
}

interface DutyActionType {
  setSelectedFirstDuty: (selectedFirstDuty: number) => void;
  setSelectedSecondDuty: (selectedSecondDuty: number) => void;
  setCheckedIds: (checkedIds: number[]) => void;
}

interface UseDutyStoreType extends DutyState, DutyActionType {}

const useDutyStore = create<UseDutyStoreType>((set) => ({
  checkedIds: [],
  selectedFirstDuty: 0,
  selectedSecondDuty: 0,
  setSelectedFirstDuty: (selectedFirstDuty) => set({ selectedFirstDuty }),
  setSelectedSecondDuty: (selectedSecondDuty) => set({ selectedSecondDuty }),
  setCheckedIds: (checkedIds) => set({ checkedIds }),
}));

export default useDutyStore;
