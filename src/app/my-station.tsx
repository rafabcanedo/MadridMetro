import { StyleSheet,View, Text } from 'react-native'
import { theme } from '@/theme'
import { Button } from '@/components/button'
import { colors } from '@/theme/colors'

export default function MyStation() {
 return (
  <>
  <View style={styles.container}>
    <Text style={styles.text}>My Station</Text>

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
  backgroundColor: theme.colors.background,
 },
 text: {
  fontSize: 22,
  fontFamily: theme.fontFamily.bold,
  color: colors.white
 },
})