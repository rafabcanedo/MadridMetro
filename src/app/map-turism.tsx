import { StyleSheet,View, Text } from 'react-native'
import { theme } from '@/theme'
import { Button } from '@/components/button'

export default function MapTurism() {
 return (
  <>
  <View style={styles.container}>
    <Text style={styles.text}>Map Turism</Text>

      <Button>
        <Button.Text>Home</Button.Text>
      </Button>
    </View>
    </>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  //alignItems: "center",
  backgroundColor: theme.colors.background,
 },
 text: {
  fontSize: 22,
  fontFamily: theme.fontFamily.bold,
 },
})