import { create } from "zustand";

const nowDate = new Date();

interface DateState {
  year: number;
  month: number;
  day: number;
}

interface DateActionType {
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
}

interface UseDateStoreType extends DateState, DateActionType {}

const useDateStore = create<UseDateStoreType>((set) => ({
  year: nowDate.getFullYear(),
  month: nowDate.getMonth() + 1,
  day: nowDate.getDay(),
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setDay: (day) => set({ day }),
}));

export default useDateStore;
