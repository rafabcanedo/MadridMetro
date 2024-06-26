import { StyleSheet,View, Image, StatusBar } from 'react-native'
import { Header } from '@/components/header'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

export default function MapTurism() {
 return (
  <>
  <View style={styles.container}>
    <Header href="/" />
      <View>
       <Image source={require('../../assets/images/turism.png')} style={styles.image} />
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
   backgroundColor: colors.background,
  },
  text: {
   fontSize: 22,
   fontFamily: fontFamily.bold,
  },
  image: {
   width: 400,
   height: 400,
  }
})