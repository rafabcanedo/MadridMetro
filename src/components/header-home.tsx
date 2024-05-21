import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export function HeaderHome() {
 return (
  <View style={styles.container}>
   <View style={styles.comunidad}>
    <Image source={require('../../assets/images/comunidadmadrid.png')} style={styles.image} />
    <Text style={styles.textComunidad}>Comunidad de Madrid</Text>
   </View>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: 80,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingRight: 22,
  backgroundColor: colors.error
 },
 comunidad: {
  flexDirection: "column",
  alignItems: "center",
 },
 image: {
  width: 50,
  height: 50,
 },
 textComunidad: {
  fontFamily: fontFamily.medium,
  color: colors.white,
 },
})