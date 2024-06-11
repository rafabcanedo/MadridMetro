import { StyleSheet, Text, View } from "react-native";
import { ESTACOES } from "@/lib/database/data";
import { useLocalSearchParams } from "expo-router";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export default function Product() {

 const { id } = useLocalSearchParams()

 const estacao = ESTACOES.find((item) => item.id === id)

 return (
  <View style={styles.container}>
   <Text style={styles.stationTitle}>
    Id Line
   </Text>

   <Text style={styles.stationDescription}>
    Description
   </Text>

   {estacao?.linhas.map((linha) => (
    <Text
     key={linha}
     style={styles.linhatext}
    >
     {"\u2022"} {linha}
    </Text>
   ))}
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.background,
 },
 stationTitle: {
  color: colors.white,
  fontSize: 14,
  fontFamily: fontFamily.medium,
 },
 stationDescription: {
  color: colors.white,
  fontSize: 12,
  fontFamily: fontFamily.regular,
  lineHeight: 24,
  marginBottom: 24,
 },
 linhatext: {
  color: colors.white,
  fontFamily: fontFamily.regular,
  fontSize: 14,
  lineHeight: 24,
 },
})