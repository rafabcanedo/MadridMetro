import { StyleSheet, Text, View } from "react-native";
import { PRODUCTS } from "@/lib/database/stations";
import { Link, useLocalSearchParams } from "expo-router";
import { Feather } from '@expo/vector-icons';
import { Button } from "@/components/button";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export default function Stars() {

 const { id } = useLocalSearchParams()

 const estacao = PRODUCTS.find((item) => item.id === id)

 return (
  <View style={styles.main}>
    <View style={styles.container}>
    <Text style={styles.stationTitle}>
     Line {estacao?.title}
    </Text>
 
    <Text style={styles.stationDescription}>
     {estacao?.description}
    </Text>
 
    {estacao?.stations.map((station) => (
     <Text
      key={station}
      style={styles.linhatext}
     >
      {station}
     </Text>
    ))}
  </View>

    <View style={styles.containerButton}>
      <Button>
        <Link href="/">
        <Button.Text>Remove From Favorite</Button.Text>
        <Button.Icon>
          <Feather name="x" size={20} />
        </Button.Icon>
        </Link>
      </Button>
    </View>
    </View>
 )
}

const styles = StyleSheet.create({
 main: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: colors.background,
 },
 container: {
  justifyContent: "center",
  alignItems: "center",
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
 containerButton: {
  padding: 20,
  paddingBottom: 32,
 },
})