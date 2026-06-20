import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

export function MyStationsScreen() {
  return (
    <View style={styles.container}>
      <Header title="My Stations" direction="right" />
      <View style={styles.content}>
        <Text variant="heading" style={{ color: theme.lightTheme.foreground }}>My Stations</Text>
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
    alignItems: 'center',
  },
});
