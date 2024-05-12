import { StyleSheet,View, Text } from 'react-native'
import { theme } from '@/theme'

export default function Home() {
 return (
  <View style={styles.container}>
    <Text style={styles.text}>Madrid</Text>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.background,
 },
 text: {
  fontSize: 22,
  fontFamily: theme.fontFamily.bold,
 },
})