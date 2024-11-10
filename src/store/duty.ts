import { create } from "zustand";

interface DutyState {
  checkedIds: number[];
  targetFirstDuty: number;
  targetSecondDuty: number;
}

interface DutyActionType {
  setTargetFirstDuty: (targetFirstDuty: number) => void;
  setTargetSecondDuty: (targetSecondDuty: number) => void;
  setCheckedIds: (checkedIds: number[]) => void;
}

interface UseDutyStoreType extends DutyState, DutyActionType {}

const useDutyStore = create<UseDutyStoreType>((set) => ({
  checkedIds: [],
  targetFirstDuty: 0,
  targetSecondDuty: 0,
  setTargetFirstDuty: (targetFirstDuty) => set({ targetFirstDuty }),
  setTargetSecondDuty: (targetSecondDuty) => set({ targetSecondDuty }),
  setCheckedIds: (checkedIds) => set({ checkedIds }),
}));

export default useDutyStore;
