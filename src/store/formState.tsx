import { create } from 'zustand';

interface FormStore {
    isOpen: boolean
    setIsOpen: (status: boolean) => void;
}

export const FormStateStore = create<FormStore>((set) => ({
    isOpen: false,
    setIsOpen: (status: boolean) => {
        set(() => ({ isOpen: status }))
    },
}));
