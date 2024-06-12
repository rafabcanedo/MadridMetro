import { StyleSheet,View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import { Cards } from '@/components/cards'
import { HeaderHome } from '@/components/header-home'
import { colors } from '@/theme/colors';

export default function Home() {

 const linkTo = useLinkTo()

 return (
  <View style={styles.container}>
    <HeaderHome />
    <View style={styles.containerImage}>
    <Image source={require('../../../assets/images/logo.png')} style={styles.image} />
   </View>
    <Cards />
    
    <View style={styles.containerWarning}>
    <TouchableOpacity 
     style={styles.warning} 
     activeOpacity={0.8}
     onPress={() => linkTo("/chat-gpt")}
    >
    <Ionicons name="chatbubble-ellipses-outline" size={30} color={colors.white} />
    </TouchableOpacity>
    </View>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  gap: 10,
  paddingTop: 40,
  backgroundColor: colors.background,
 },
 containerImage: {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
  marginTop: 20,
 },
 image: {
  width: 250,
  height: 150,
 },
 containerWarning: {
  alignItems: "flex-end",
  justifyContent: "center",
  marginTop: 40,
 },
 warning: {
  alignItems: "center",
  justifyContent: "center",
  marginRight: 30,
  backgroundColor: colors.primary,
  width: 50,
  height: 50,
  borderRadius: 50,
 },
})