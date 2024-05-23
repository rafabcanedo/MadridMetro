import { StyleSheet,View, Text } from 'react-native'
import { theme } from '@/theme'
import { Button } from '@/components/button'
import { colors } from '@/theme/colors'
import { useLinkTo } from '@react-navigation/native'
import { Input } from '@/components/input'
import { Header } from '@/components/header'

export default function SearchRoute() {
 
 const linkTo = useLinkTo()

 return (
  <>
  <View style={styles.container}>
   <Header href="/" />

    <Text style={styles.text}>Route</Text>

      <View style={{ marginTop: 10 }}>
      <Input>
      <Input.Field
       placeholder="Select your role"
      />
      </Input>

      <Input>
      <Input.Field
       placeholder="Select your destine"
      />
      </Input>
      </View>

      <Button onPress={() => linkTo("/")}>
        <Button.Text>Search Route</Button.Text>
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