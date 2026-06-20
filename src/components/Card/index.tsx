import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { TrainFront, ChevronRight, Star } from 'lucide-react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';
import type { CardProps, CardSize } from '@/@types';

const padding: Record<CardSize, number> = {
  md: 16,
  sm: 12,
};

const cardBase: ViewStyle = {
  backgroundColor: theme.lightTheme.background,
  borderRadius: 16,
  borderWidth: 2,
  borderColor: theme.darkTheme.background,
  shadowColor: '#000000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
};

export function Card(props: CardProps) {
  const { size = 'md' } = props;
  const p = padding[size];

  if (props.variant === 'line') {
    return (
      <Pressable onPress={props.onPress} style={[cardBase, { padding: p }]}>
        <View style={styles.lineRow}>
          <TrainFront size={20} color={theme.lightTheme.foreground} />
          <Text variant="subheading" style={styles.lineName}>{props.lineName}</Text>
          <ChevronRight size={20} color={theme.lightTheme.foreground} />
        </View>
        <View style={[styles.lineBar, { backgroundColor: props.lineColor }]} />
      </Pressable>
    );
  }

  return (
    <View style={[cardBase, { padding: p }]}>
      <View style={styles.stationRow}>
        <View style={styles.stationContent}>
          <Text variant="subheading" style={{ color: theme.lightTheme.foreground }}>
            {props.stationName}
          </Text>
          <Text variant="caption" style={{ color: theme.colors.subtitle }}>
            {Math.floor(Math.random() * 10) + 1} min
          </Text>
        </View>
        <Pressable onPress={props.onUnfavorite} hitSlop={8}>
          <Star
            size={20}
            color={theme.colors.yellow}
            fill={props.isFavorited ? theme.colors.yellow : 'transparent'}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  } as ViewStyle,
  lineName: {
    flex: 1,
    color: theme.lightTheme.foreground,
  },
  lineBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 12,
  } as ViewStyle,
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  stationContent: {
    flex: 1,
    gap: 2,
  } as ViewStyle,
});
