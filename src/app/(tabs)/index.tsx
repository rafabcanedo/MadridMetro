import { StyleSheet,View, Image } from 'react-native'
import { theme } from '@/theme'
import { Cards } from '@/components/cards'
import { HeaderHome } from '@/components/header-home'

export default function Home() {
 return (
  <View style={styles.container}>
    <HeaderHome />
    <View style={styles.containerImage}>
    <Image source={require('../../../assets/images/logo.png')} style={styles.image} />
   </View>
    <Cards />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  gap: 10,
  backgroundColor: theme.colors.background,
 },
 containerImage: {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
 },
 image: {
  width: 250,
  height: 150,
 },
})