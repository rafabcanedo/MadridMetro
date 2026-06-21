import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type FavoriteStation = {
  stationId: string;
  stationName: string;
  lineId: string;
  lineNumber: number | string;
  lineColor: string;
  lineName: string;
};

type FavoritesContextType = {
  favorites: FavoriteStation[];
  isFavorited: (stationId: string) => boolean;
  toggleFavorite: (station: FavoriteStation) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteStation[]>([]);

  function isFavorited(stationId: string) {
    return favorites.some((f) => f.stationId === stationId);
  }

  function toggleFavorite(station: FavoriteStation) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.stationId === station.stationId);
      if (exists) return prev.filter((f) => f.stationId !== station.stationId);
      return [...prev, station];
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorited, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
