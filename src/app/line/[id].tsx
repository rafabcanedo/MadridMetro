import { StyleSheet, Text, View } from "react-native";
import { PRODUCTS } from "@/lib/database/stations";
import { Link, useLocalSearchParams } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Button } from "@/components/button";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

import { useFavoriteStore } from "@/store/favorite-store";

export default function Line() {

 const favoriteStore = useFavoriteStore()

 const { id } = useLocalSearchParams()

 const estacao = PRODUCTS.find((item) => item.id === id)

 function handleAddToFavorite() {
  if (estacao) {
    favoriteStore.add(estacao)
  }
 }

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
      <Button onPress={handleAddToFavorite}>
      <Link href="/">
        <Button.Text>Add To Favorite</Button.Text>
        <Button.Icon>
          <AntDesign name="staro" size={20} />
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