import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { theme } from '@/theme';

export function MapsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Maps" direction="left" />
      <View style={styles.content}>
        <Button label="Metro Map" variant="secondary" size="wide" colorScheme="light" />
        <Button label="Turism Map" variant="secondary" size="wide" colorScheme="light" />
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
