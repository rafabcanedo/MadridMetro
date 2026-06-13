import { Text } from '@/components/Text';
import { theme } from '@/theme';
import { Image, StyleSheet, View } from 'react-native';

function VerticalLabel({ text }: { text: string }) {
  return (
    <View style={styles.verticalLabel}>
      {text.split(' ').map((word, i) => (
        <Text key={i} variant="label">{word}</Text>
      ))}
    </View>
  );
}

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
        <View style={styles.metroMadrid}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.comunidadMadrid}>
        <Image
          source={require('@/assets/comunidadmadrid.png')}
          style={styles.logoComunidad}
          resizeMode="contain"
        />
        <Text variant="heading" style={{ fontSize: 12 }}>Comunidad de Madrid</Text>
      </View>
      <View style={styles.labelLeft}>
        <VerticalLabel text="Maps" />
      </View>
      <View style={styles.labelRight}>
        <VerticalLabel text="My Stations" />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  metroMadrid: {
    alignItems: 'center',
  },
  comunidadMadrid: {
    position: 'absolute',
    bottom: 72,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 140,
  },
  logoComunidad: {
    width: 60,
    height: 60,
  },
  labelRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  verticalLabel: {
    alignItems: 'center',
  },
});
