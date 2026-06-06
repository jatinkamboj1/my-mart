import { create } from "zustand";

const useUserStore = create((set) => ({
  incVat: null,

  handleVat: async (value) => {
    set((state) => ({
      incVat: value,
    }));
  }
}));

export default useUserStore;
