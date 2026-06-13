import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.labelTop}>
        <Text variant="label">Info</Text>
      </View>
      <View style={styles.labelBottom}>
        <Text variant="label">Routes</Text>
      </View>
      <View style={styles.center}>
        <Image
          source={require('@/assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.labelLeft}>
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <Text variant="label">Maps</Text>
        </View>
      </View>
      <View style={styles.labelRight}>
        <View style={{ transform: [{ rotate: '-90deg' }] }}>
          <Text variant="label">My Stations</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  labelTop: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  labelBottom: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  labelLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 140,
  },
  labelRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
