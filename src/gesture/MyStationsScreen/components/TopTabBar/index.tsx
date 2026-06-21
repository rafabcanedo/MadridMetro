import { View, Pressable, StyleSheet } from 'react-native';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Star, TrainFront } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

const TAB_ICONS: Record<string, LucideIcon> = {
  MyStations: Star,
  Stations: TrainFront,
};

const TAB_LABELS: Record<string, string> = {
  MyStations: 'My Stations',
  Stations: 'Stations',
};

export function TopTabBar({ state, navigation }: MaterialTopTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = TAB_ICONS[route.name];
        const label = TAB_LABELS[route.name] ?? route.name;
        const color = isFocused ? theme.lightTheme.foreground : theme.colors.subtitle;

        function onPress() {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.tabActive]}
          >
            {Icon && <Icon size={16} color={color} />}
            <Text variant="label" style={{ color }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.hover,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: theme.lightTheme.foreground,
  },
});
