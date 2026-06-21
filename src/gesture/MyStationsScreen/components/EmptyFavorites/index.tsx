import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

export function EmptyFavorites() {
  return (
    <View style={styles.container}>
      <Star size={40} color={theme.colors.subtitle} />
      <Text variant="body" style={styles.message}>
        Tu lista de favoritos está vacía, marca tu estación favorita
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  message: {
    color: theme.colors.subtitle,
    textAlign: 'center',
  },
});
