import 'react-native-reanimated';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { theme } from '@/theme';
import { HomeScreen } from './HomeScreen';
import { InfoScreen } from './InfoScreen';
import { MapsScreen } from './MapsScreen';
import { MyStationsScreen } from './MyStationsScreen';
import { RoutesScreen } from './RoutesScreen';

const { width: W, height: H } = Dimensions.get('window');

const SPRING = { damping: 20, stiffness: 200 };
const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 500;

function isValid(col: number, row: number): boolean {
  'worklet';
  return (
    (col === 0 && row === -1) || // Info
    (col === -1 && row === 0) || // Maps
    (col === 0 && row === 0) ||  // Home
    (col === 1 && row === 0) ||  // My Stations
    (col === 0 && row === 1)     // Routes
  );
}

export function GestureNavigator() {
  const col = useSharedValue(0);
  const row = useSharedValue(0);
  const tx = useSharedValue(-W);
  const ty = useSharedValue(-H);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      'worklet';
      tx.value = -(col.value + 1) * W + e.translationX;
      ty.value = -(row.value + 1) * H + e.translationY;
    })
    .onEnd((e) => {
      'worklet';
      const absX = Math.abs(e.translationX);
      const absY = Math.abs(e.translationY);

      let targetCol = col.value;
      let targetRow = row.value;

      if (
        Math.max(absX, absY) > SWIPE_THRESHOLD ||
        Math.max(Math.abs(e.velocityX), Math.abs(e.velocityY)) > VELOCITY_THRESHOLD
      ) {
        if (absX >= absY) {
          targetCol += e.translationX < 0 ? 1 : -1;
        } else {
          targetRow += e.translationY < 0 ? 1 : -1;
        }
      }

      if (!isValid(targetCol, targetRow)) {
        targetCol = col.value;
        targetRow = row.value;
      }

      col.value = targetCol;
      row.value = targetRow;
      tx.value = withSpring(-(targetCol + 1) * W, SPRING);
      ty.value = withSpring(-(targetRow + 1) * H, SPRING);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.viewport}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {/* Info — col 0, row -1 */}
          <View style={[styles.cell, { left: W, top: 0 }]}>
            <InfoScreen />
          </View>
          {/* Maps — col -1, row 0 */}
          <View style={[styles.cell, { left: 0, top: H }]}>
            <MapsScreen />
          </View>
          {/* Home — col 0, row 0 */}
          <View style={[styles.cell, { left: W, top: H }]}>
            <HomeScreen />
          </View>
          {/* My Stations — col 1, row 0 */}
          <View style={[styles.cell, { left: 2 * W, top: H }]}>
            <MyStationsScreen />
          </View>
          {/* Routes — col 0, row 1 */}
          <View style={[styles.cell, { left: W, top: 2 * H }]}>
            <RoutesScreen />
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
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
