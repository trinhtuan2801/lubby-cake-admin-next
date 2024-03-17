import { UserData } from '@/api/user';
import { create } from 'zustand';

interface UseUserInfo {
  userData?: UserData;
  setUserData: (userData?: UserData) => void;
}

const useUserInfo = create<UseUserInfo>((set) => ({
  userData: undefined,
  setUserData: (userData) => {
    set({ userData });
  },
}));

export default useUserInfo;
