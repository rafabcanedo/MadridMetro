import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { theme } from '@/theme';

export function MapsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Maps" direction="left" />
      <View style={styles.content}>
        <Button
          label="Metro Map"
          variant="secondary"
          size="wide"
          colorScheme="light"
          onPress={() => router.push({ pathname: '/map-viewer' as any, params: { type: 'metro' } })}
        />
        <Button
          label="Turism Map"
          variant="secondary"
          size="wide"
          colorScheme="light"
          onPress={() => router.push({ pathname: '/map-viewer' as any, params: { type: 'turism' } })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightTheme.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
});
