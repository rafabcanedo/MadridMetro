import { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native';

import { theme } from '@/theme';
import { HomeScreen } from '@/components/HomeScreen';
import { InfoScreen } from '@/components/InfoScreen';
import { MapsScreen } from '@/components/MapsScreen';
import { MyStationsScreen } from '@/components/MyStationsScreen';
import { RoutesScreen } from '@/components/RoutesScreen';

const { width: W, height: H } = Dimensions.get('window');

const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 0.5;

function isValid(col: number, row: number): boolean {
  return (
    (col === 0 && row === -1) ||
    (col === -1 && row === 0) ||
    (col === 0 && row === 0) ||
    (col === 1 && row === 0) ||
    (col === 0 && row === 1)
  );
}

export function GestureNavigator() {
  const col = useRef(0);
  const row = useRef(0);
  const pan = useRef(new Animated.ValueXY({ x: -W, y: -H })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.max(Math.abs(g.dx), Math.abs(g.dy)) > 10,

      onPanResponderRelease: (_, g) => {
        const absX = Math.abs(g.dx);
        const absY = Math.abs(g.dy);

        let targetCol = col.current;
        let targetRow = row.current;

        if (
          Math.max(absX, absY) > SWIPE_THRESHOLD ||
          Math.max(Math.abs(g.vx), Math.abs(g.vy)) > VELOCITY_THRESHOLD
        ) {
          if (absX >= absY) {
            targetCol += g.dx < 0 ? 1 : -1;
          } else {
            targetRow += g.dy < 0 ? 1 : -1;
          }
        }

        if (!isValid(targetCol, targetRow)) {
          targetCol = col.current;
          targetRow = row.current;
        }

        col.current = targetCol;
        row.current = targetRow;

        Animated.spring(pan, {
          toValue: {
            x: -(targetCol + 1) * W,
            y: -(targetRow + 1) * H,
          },
          damping: 20,
          stiffness: 200,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.viewport} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
      >
        <View style={[styles.cell, { left: W, top: 0 }]}>
          <InfoScreen />
        </View>
        <View style={[styles.cell, { left: 0, top: H }]}>
          <MapsScreen />
        </View>
        <View style={[styles.cell, { left: W, top: H }]}>
          <HomeScreen />
        </View>
        <View style={[styles.cell, { left: 2 * W, top: H }]}>
          <MyStationsScreen />
        </View>
        <View style={[styles.cell, { left: W, top: 2 * H }]}>
          <RoutesScreen />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
  },
  container: {
    width: 3 * W,
    height: 3 * H,
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    width: W,
    height: H,
  },
});
