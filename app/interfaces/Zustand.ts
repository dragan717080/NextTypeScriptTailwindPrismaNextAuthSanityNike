import Product from './Product';

export interface AuthStore {
  authToken: string | null;
  error: string | null;
  setAuthToken: (authToken: string | null) => void;
  setError: (error: string | null) => void;
}

export interface HeaderBurgerMenuStore {
  isHeaderBurgerMenuOpen: boolean;
  toggleIsHeaderBurgerMenuOpen: () => void;
}

export interface NavbarPortalStore {
  isNavbarPortalOpen: boolean;
  setIsNavbarPortalOpen: (value: boolean) => void;
}

export interface SearchInputStore {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

export interface ProductsStore {
  products: Product[];
  setProducts: (value: Product[]) => void;
}

export interface ProductsMatchingInputStore {
  productsMatchingInput: Product[];
  setProductsMatchingInput: (value: Product[]) => void
}

export interface ShirtStore {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
  setDynamicState: (property: string, value: boolean|string) => void;
}
