import { StyleSheet, Text, View } from "react-native";
import { Header } from "@/components/header";
import { Title } from "@/components/title";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import { Button } from "@/components/button";
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

export default function Path() {
 return (
  <View style={styles.container}>
   <Header href="/" />
   <Title title="Your path" />

   <View style={styles.containerIcons}>
    <FontAwesome6
     name="person-walking"
     size={25}
     color={colors.white}
    />
    <MaterialIcons
     name="directions-transit-filled"
     size={25}
     color={colors.white}
    />
   </View>

   <View style={styles.viewLines}>
    
   <View>
    <View style={styles.viewProgress} />
   </View>
   
   <View style={styles.actProgress}>
   <View>
    <Text style={styles.nameLine}>San Bernardo</Text>
   </View>

   <View>
    <Text style={styles.nameLine}>Santiago Bernabeu</Text>
   </View>
   </View>
   </View>

   <Button>
    <Button.Text>Back to Home</Button.Text>
   </Button>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: colors.background,
  padding: 12,
  paddingTop: 52,
 },
 containerIcons: {
  flexDirection: "row",
  gap: 8,
  paddingBottom: 30,
 },
 viewLines: {
  flexDirection: "row",
  gap: 10,
 },
 viewProgress: {
  width: 6,
  height: 69,
  backgroundColor: "#7dd87d",
 },
 actProgress: {
  gap: 30,
  paddingBottom: 25,
 },
 nameLine: {
  color: colors.input,//"#A1A1A1",
  fontFamily: fontFamily.medium,
  fontSize: 20,
 },
})