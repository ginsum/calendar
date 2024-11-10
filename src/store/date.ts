import { create } from "zustand";

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
  year: 2024,
  month: 10,
  day: 1,
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setDay: (day) => set({ day }),
}));

export default useDateStore;
