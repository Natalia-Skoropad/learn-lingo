import { create } from 'zustand';
import type { Teacher } from '@/types/teacher';

//===============================================================

export type ModalType =
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'bookLesson'
  | null;

type ModalPayload = {
  teacher?: Teacher;
};

type ModalStore = {
  modalType: ModalType;
  payload: ModalPayload | null;

  openModal: (
    type: Exclude<ModalType, null>,
    payload?: ModalPayload | null
  ) => void;

  closeModal: () => void;
};

//===============================================================

export const useModalStore = create<ModalStore>()((set) => ({
  modalType: null,
  payload: null,

  openModal: (type, payload = null) =>
    set({
      modalType: type,
      payload,
    }),

  closeModal: () =>
    set({
      modalType: null,
      payload: null,
    }),
}));
