import { create } from "zustand";

interface OTPModalStore {
  isOpen: boolean;
  email: string | null;
  open: () => void;
  close: () => void;
  setEmail: (email: string ) => void;
}

const useOTPModal = create<OTPModalStore>((set) => ({
    isOpen: false,
    email: null,
    open: () => set({ isOpen: true}),
    close: () => set({ isOpen: false}),
    setEmail: (email: string) => set({ email }),
}));

export default useOTPModal;