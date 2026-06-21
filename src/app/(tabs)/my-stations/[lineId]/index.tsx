import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Star, ChevronLeft } from 'lucide-react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';
import { stationsByLineId, metroLines } from '@/constants/metro';
import { useFavorites } from '@/context/FavoritesContext';
import type { Station } from '@/constants/metro';

export default function StationsListScreen() {
  const { lineId, lineColor, lineName } = useLocalSearchParams<{
    lineId: string;
    lineColor: string;
    lineName: string;
  }>();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorited, toggleFavorite } = useFavorites();

  const stations = stationsByLineId[lineId] ?? [];
  const line = metroLines.find((l) => l.lineId === lineId);

  function renderItem({ item }: { item: Station }) {
    const favorited = isFavorited(item.id);
    return (
      <View style={styles.item}>
        <Text variant="subheading" style={styles.stationName}>
          {item.name}
        </Text>
        <Pressable
          onPress={() =>
            toggleFavorite({
              stationId: item.id,
              stationName: item.name,
              lineId,
              lineNumber: line?.lineNumber ?? lineId,
              lineColor,
              lineName: lineName ?? '',
            })
          }
          hitSlop={8}
        >
          <Star
            size={20}
            color={theme.colors.yellow}
            fill={favorited ? theme.colors.yellow : 'transparent'}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={8}>
          <ChevronLeft size={24} color={theme.lightTheme.foreground} />
        </Pressable>
        <Text variant="heading" style={styles.title}>
          {lineName ?? `Línea ${lineId}`}
        </Text>
      </View>
      <View style={[styles.lineBar, { backgroundColor: lineColor }]} />
      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightTheme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    color: theme.lightTheme.foreground,
  },
  lineBar: {
    height: 4,
    marginHorizontal: 16,
    borderRadius: 2,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  stationName: {
    flex: 1,
    color: theme.lightTheme.foreground,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.hover,
    opacity: 0.2,
  },
});
