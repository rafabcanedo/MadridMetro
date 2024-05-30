import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "@/theme/colors";
import { ButtonLinkProps } from "@/@types";
import { Link } from "expo-router";

export function Header({ icon, ...rest}: ButtonLinkProps) {
 return (
  <View style={styles.header}>
   <Link {...rest}>
   <AntDesign 
    name="arrowleft"
    size={40} 
    color={colors.white}
    style={styles.icon}
   />
   </Link>
  </View>
 )
}

const styles = StyleSheet.create({
 header: {
  width: '100%',
  height: 60,
  justifyContent: "center",
  paddingBottom: 20,
  marginLeft: 20,
  marginRight: 20,
 },
 icon: {
  marginLeft: 10,
 }
})