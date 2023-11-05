import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
    }),
    {
      name: 'zustand-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export const useHeaderBurgerMenuStore = create((set) => ({
  isHeaderBurgerMenuOpen: false,
  toggleIsHeaderBurgerMenuOpen: () => set((state) => ({ isHeaderBurgerMenuOpen: !state.isHeaderBurgerMenuOpen }))
}));

export const useNavbarPortalStore = create((set) => ({
  isNavbarPortalOpen: false,
  setIsNavbarPortalOpen: (value) => set((state) => ({ isNavbarPortalOpen: value }))
}));

export const useAuthStore = create(persist(
  (set, get) => ({
    authToken: null,
    error: null,
    setAuthToken: (authToken) => set({ authToken, error: null }),
    setError: (error) => set({ error }),
  }),
  {
    name: 'zustand-auth-storage',
    storage: createJSONStorage(() => sessionStorage),
  }
))
