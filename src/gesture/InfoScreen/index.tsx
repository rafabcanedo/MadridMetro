import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

export function InfoScreen() {
  return (
    <View style={styles.container}>
      <Header title="Info" direction="up" />
      <View style={styles.content}>
        <Text variant="heading" style={{ color: theme.lightTheme.foreground }}>Info</Text>
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
