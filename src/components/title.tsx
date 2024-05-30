import { TitleProps } from "@/@types";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import { StyleSheet, Text, View } from "react-native";

export function Title({ title }: TitleProps) {
 return(
  <View style={styles.container}>
   <Text style={styles.title}>{title}</Text>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  alignItems: "center",
  marginTop: 4,
 },
 title: {
  color: colors.white,
  fontFamily: fontFamily.bold,
  fontSize: 18, 
 },
})