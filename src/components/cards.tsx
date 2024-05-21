import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export function Cards() {
 return (
  <View style={styles.test}>

  <View style={styles.container}>
   <TouchableOpacity style={styles.card}>
   <FontAwesome name="map-o" size={30} color={colors.white} />
   <Text style={styles.text}>Maps</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.card}>
   <Entypo name="location" size={30} color={colors.white} />
   <Text style={styles.text}>Line Stop</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.card}>
   <FontAwesome5 name="route" size={30} color={colors.white} />
   <Text style={styles.text}>Routes</Text>
   </TouchableOpacity>
   </View>

   <View style={styles.container}>
   <TouchableOpacity style={styles.card}>
   <FontAwesome name="star-o" size={30} color={colors.white} />
   <Text style={styles.text}>My Stations</Text>
   </TouchableOpacity>
   
   <TouchableOpacity style={styles.card}>
   <Ionicons name="library-outline" size={30} color={colors.white} />
   <Text style={styles.text}>Cultural Guide</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.card}>
   <AntDesign name="questioncircleo" size={30} color={colors.white} />
   <Text style={styles.text}>Questions</Text>
   </TouchableOpacity>
   </View>
   </View>
 )
}

const styles = StyleSheet.create({
 test: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 26,
 },
 container: {
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
 gap: 22,
 },
 card: {
  alignItems: "center",
  gap: 12,
 },
 text: {
  fontFamily: fontFamily.regular,
  fontSize: 20,
  color: colors.white,
 },
})