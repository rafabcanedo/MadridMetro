import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { 
  FontAwesome,
  Entypo, 
  FontAwesome5, 
  Ionicons, 
  Fontisto 
} from '@expo/vector-icons';
import { useLinkTo } from "@react-navigation/native";
import * as Linking from 'expo-linking'
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export function Cards() {

 const linkTo = useLinkTo()

 return (
  <View style={styles.test}>

  <View style={styles.container}>
  <TouchableOpacity 
   style={styles.card} 
   activeOpacity={0.5}
   onPress={() => linkTo("/map")}
  >
   <Fontisto name="map" size={30} color={colors.white} />
   <Text style={styles.text}>General Map</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.card} 
    activeOpacity={0.5}
    onPress={() => linkTo("/line-stops")}
   >
   <Entypo name="location" size={30} color={colors.white} />
   <Text style={styles.text}>Line Stops</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.card}
    activeOpacity={0.5}
    onPress={() => linkTo("/search-route")}
   >
   <FontAwesome5 name="route" size={30} color={colors.white} />
   <Text style={styles.text}>Routes</Text>
   </TouchableOpacity>
   </View>

   <View style={styles.container}>
   <TouchableOpacity 
    style={styles.card} 
    activeOpacity={0.5}
    
   >
   <FontAwesome name="map-o" size={30} color={colors.white} />
   <Text style={styles.text}>Maps</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.card} 
    activeOpacity={0.5}
    onPress={() => linkTo("/my-station")}
   >
   <FontAwesome name="star-o" size={30} color={colors.white} />
   <Text style={styles.text}>My Stations</Text>
   </TouchableOpacity>
   
   <TouchableOpacity 
    style={styles.card} 
    activeOpacity={0.5}
    onPress={() => Linking.openURL("http://www.metromadrid.es")}
   >
   <Ionicons name="library-outline" size={30} color={colors.white} />
   <Text style={styles.text}>Cultural Guide</Text>
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
  //alignItems: "center",
  flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
  gap: 12,
 },
 text: {
  fontFamily: fontFamily.regular,
  fontSize: 20,
  color: colors.white,
 },
})