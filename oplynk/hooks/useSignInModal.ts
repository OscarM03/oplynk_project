import { create } from "zustand";

interface SignInModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useSignInModal = create<SignInModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false})
}))

export default useSignInModal;