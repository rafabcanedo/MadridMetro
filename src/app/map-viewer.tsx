import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { theme } from '@/theme';

const MAPS = {
  metro: require('@/assets/metro.png'),
  turism: require('@/assets/turism.png'),
} as const;

export default function MapViewer() {
  const { type } = useLocalSearchParams<{ type: keyof typeof MAPS }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable onPress={() => router.back()} style={styles.close} hitSlop={8}>
        <X size={24} color={theme.lightTheme.foreground} />
      </Pressable>
      <Image
        source={MAPS[type] ?? MAPS.metro}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightTheme.background,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});
