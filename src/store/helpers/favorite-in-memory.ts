import { StationCartProps } from '@/store/favorite-store';
import { StationProps } from '@/lib/database/data';

export function add(stations: StationCartProps[], newStation: StationProps) {
  const existingFavorite = stations.find(({ id }) => newStation.id === id);

  if (existingFavorite) {
    return stations.map((station) =>
      station.id === existingFavorite.id
        ? { ...station, quantity: station.quantity + 1 }
        : station,
    );
  }

  return [...stations, { ...newStation, quantity: 1 }];
}

export function remove(stations: StationCartProps[], stationRemovedId: string) {
 const updateStations = stations.map((station) =>
 station.id === stationRemovedId 
  ? {
  ...station,
  quantity: station.quantity > 1 ? station.quantity - 1 : 0,
 }
  : station
 )

 return updateStations.filter((station) => station.quantity > 0)
}