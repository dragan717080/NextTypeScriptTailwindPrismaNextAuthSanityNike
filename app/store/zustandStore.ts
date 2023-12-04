import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore, HeaderBurgerMenuStore, NavbarPortalStore, 
  SearchInputStore, ProductsStore, ProductsMatchingInputStore, ShirtStore } 
  from '@/app/interfaces/Zustand';

export const useHeaderBurgerMenuStore = create<HeaderBurgerMenuStore>((set) => ({
  isHeaderBurgerMenuOpen: false,
  toggleIsHeaderBurgerMenuOpen: () => set((state) => ({ isHeaderBurgerMenuOpen: !state.isHeaderBurgerMenuOpen }))
}));

export const useNavbarPortalStore = create<NavbarPortalStore>((set) => ({
  isNavbarPortalOpen: false,
  setIsNavbarPortalOpen: (value) => set((state) => ({ isNavbarPortalOpen: value })),
}));

export const useAuthStore = create<AuthStore>()(
  persist(
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
  )
);

export const useSearchInputStore = create<SearchInputStore>((set) => ({
  searchInput: '',
  setSearchInput: (value) => set((state) => ({ searchInput: value })),
}));

export const useProductsMatchingInputStore = create<ProductsMatchingInputStore>((set) => ({
  productsMatchingInput: [],
  setProductsMatchingInput: (value) => set((state) => ({ productsMatchingInput: value }))
}));

export const useProductsStore = create<ProductsStore>()(persist(
  (set, get) => ({
    products: [],
    setProducts: (value) => set((state) => ({ products: value })),
  }),
  {
    name: 'zustand-products-storage',
    storage: createJSONStorage(() => localStorage),
  }
));

export const useShirtStore = create<ShirtStore>((set) => ({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './assets/images/logo.webp',
  fullDecal: './assets/images/logo.webp',
  
  setDynamicState: (property, value) => set((state) => ({ ...state, [property]: value })),
}));
