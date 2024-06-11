import { StyleSheet, Text, View } from "react-native";
import { ESTACOES } from "@/lib/database/data";
import { useLocalSearchParams } from "expo-router";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export default function Line() {

 const { id } = useLocalSearchParams()

 const estacao = ESTACOES.find((item) => item.id === id)

 return (
    <View style={styles.container}>
    <Text style={styles.stationTitle}>
     Line {estacao?.title}
    </Text>
 
    <Text style={styles.stationDescription}>
     {estacao?.description}
    </Text>
 
    {estacao?.linhas.map((linha) => (
     <Text
      key={linha}
      style={styles.linhatext}
     >
      {linha}
     </Text>
    ))}
   </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.background,
 },
 stationTitle: {
  color: colors.white,
  fontSize: 18,
  fontFamily: fontFamily.bold,
 },
 stationDescription: {
  color: colors.primary,
  fontSize: 12,
  fontFamily: fontFamily.regular,
  lineHeight: 24,
  marginTop: 10,
  marginBottom: 24,
 },
 linhatext: {
  color: colors.white,
  fontFamily: fontFamily.regular,
  fontSize: 14,
  lineHeight: 24,
  marginTop: 8,
  marginBottom: 8,
 },
})