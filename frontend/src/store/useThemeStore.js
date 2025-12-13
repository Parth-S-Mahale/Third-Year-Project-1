import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("kaushalX-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("kaushalX-theme", theme)
    set({ theme });
  },
}));
