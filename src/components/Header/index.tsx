import { View, StyleSheet } from 'react-native';
import { Text } from '../Text';
import type { Direction, HeaderProps } from '@/@types';

const arrowMap: Record<Direction, string> = {
  up: '↓',
  down: '↑',
  left: '→',
  right: '←',
};

export function Header({ title, direction }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text variant="heading">{arrowMap[direction]}</Text>
      <Text variant="heading">{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 56,
    paddingHorizontal: 24,
  },
});
