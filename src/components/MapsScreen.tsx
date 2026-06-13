import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

export function MapsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Maps" direction="left" />
      <View style={styles.content}>
        <Text variant="heading">Maps</Text>
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
