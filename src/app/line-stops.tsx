import { useRef } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { colors } from '@/theme/colors'
import { fontFamily } from "@/theme/fontFamily";
import { StationProps, METRO } from "@/lib/database/data";
import { Station } from "@/components/station";
import { Link } from "expo-router";

export default function LineStops() {

 const sectionListRef = useRef<SectionList<StationProps>>(null)

 const linkTo = useLinkTo()

 return (
   <View style={styles.container}>
    <SectionList
     ref={sectionListRef}
     sections={METRO}
     keyExtractor={(item) => item.id}
     stickySectionHeadersEnabled={false}
     renderItem={({ item }) => (
      <Link href={`/line/${item.id}`} asChild>
       <Station data={item} />
      </Link>
     )}
     renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.header}>{title}</Text>
     )}
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{ paddingBottom: 100 }}
     style={styles.sectionContainer}
    />
  </View>
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
 header: {
  fontSize: 18,
  color: colors.primary,
  fontFamily: fontFamily.bold,
  marginTop: 42,
  marginBottom: 12,
 },
 sectionContainer: {
  flex: 1,
  padding: 20,
 },
})