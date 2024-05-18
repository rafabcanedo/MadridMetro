import { StyleSheet,View, Text, Image, StatusBar } from 'react-native'
import { theme } from '@/theme'
import { Header } from '@/components/header'

export default function MapMetro() {
 return (
  <>
  <View style={styles.container}>
   <StatusBar barStyle="light-content" />
    <Header href="/" />
      <View>
       <Image source={require('../../assets/images/metro.png')} style={styles.image} />
      </View>
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
 image: {
  width: 400,
  height: 400,
 }
})