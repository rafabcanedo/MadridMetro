import { View, Text, StyleSheet } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { Button } from '@/components/button'
import { colors } from '@/theme/colors'
import { fontFamily } from "@/theme/fontFamily";

export default function LineStops() {

 const linkTo = useLinkTo()

 return (
  <>
   <View style={styles.container}>
    <Text style={styles.text}>LineStops</Text>

   <Button onPress={() => linkTo("/")}>
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
  backgroundColor: colors.background,
 },
 text: {
  fontSize: 22,
  fontFamily: fontFamily.bold,
  color: colors.white
 },
})