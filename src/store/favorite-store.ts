import { create } from "zustand";
import { StationProps } from "@/lib/database/data";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as favoriteInMemory from "./helpers/favorite-in-memory";

export type StationCartProps = StationProps & {
  quantity: number
 }
 
 type StateProps = {
  stations: StationCartProps[]
  add: (station: StationProps) => void
  remove: (stationId: string) => void
  clear: () => void
 }
 
 export const useCartStore = create(
  persist<StateProps>((set) => ({
  stations: [],
  
  add: (station: StateProps) => set((state) => ({
     stations: favoriteInMemory.add(state.stations, station)
  })),
 
  remove: (stationId: string) =>
   set((state) => ({
    stations: favoriteInMemory.remove(state.stations, stationId),
   })),
 
   clear: () => set(() => ({ stations: []}))
 }), 
  {
   name: "metro-madrid:favorite",
   storage: createJSONStorage(() => AsyncStorage),
  }
 )
 )