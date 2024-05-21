import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "@/theme/colors";

export function HeaderHome() {
 return (
  <View style={styles.container}>
   <View style={styles.comunidad}>
    <Image source={require('../../assets/images/comunidadmadrid.png')} style={styles.image} />
    <Text>Comunidad de Madrid</Text>
   </View>
    <AntDesign name="warning" size={24} color={colors.error} />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: 80,
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: colors.error
 },
 comunidad: {
  flexDirection: "column",
  alignItems: "center"
 },
 image: {
  width: 50,
  height: 50,
 }, 
})