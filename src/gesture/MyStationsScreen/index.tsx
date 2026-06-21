import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { theme } from '@/theme';
import { metroLines } from '@/constants/metro';
import { useFavorites } from '@/context/FavoritesContext';
import { EmptyFavorites } from './components/EmptyFavorites';
import { TopTabBar } from './components/TopTabBar';

const Tab = createMaterialTopTabNavigator();

function MyStationsTab() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.stationId}
      renderItem={({ item }) => (
        <Card
          variant="station"
          stationName={item.stationName}
          lineNumber={item.lineNumber as number}
          lineColor={item.lineColor}
          lineName={item.lineName}
          isFavorited
          onUnfavorite={() => toggleFavorite(item)}
        />
      )}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

function StationsTab() {
  const router = useRouter();

  return (
    <FlatList
      data={metroLines}
      keyExtractor={(item) => item.lineId}
      renderItem={({ item }) => (
        <Card
          variant="line"
          lineId={item.lineId}
          lineNumber={item.lineNumber as number}
          lineColor={item.lineColor}
          lineName={item.lineName}
          onPress={() =>
            router.push({
              pathname: '/my-stations/[lineId]' as any,
              params: { lineId: item.lineId, lineColor: item.lineColor, lineName: item.lineName },
            })
          }
        />
      )}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

export function MyStationsScreen() {
  return (
    <View style={styles.container}>
      <Header title="My Stations" direction="right" />
      <Tab.Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        sceneContainerStyle={{ backgroundColor: theme.lightTheme.background }}
      >
        <Tab.Screen name="MyStations" component={MyStationsTab} />
        <Tab.Screen name="Stations" component={StationsTab} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightTheme.background,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 8,
  },
});
