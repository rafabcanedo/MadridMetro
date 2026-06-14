import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

export function RoutesScreen() {
  return (
    <View style={styles.container}>
      <Header title="Routes" direction="down" />
      <View style={styles.content}>
        <Text variant="heading">Routes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
