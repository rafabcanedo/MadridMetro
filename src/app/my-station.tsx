import { useRef } from "react";
import { StyleSheet,View, Text, SectionList } from 'react-native'
import { useLinkTo } from '@react-navigation/native'
import { Button } from '@/components/button'
import { StationProps, METRO, LIKE } from "@/lib/database/stations";
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { Link } from "expo-router";
import { StationLike } from "@/components/station-like";

export default function MyStation() {

 const sectionListRef = useRef<SectionList<StationProps>>(null)

 const linkTo = useLinkTo()

 return (
  <View style={styles.container}>
    <SectionList
     ref={sectionListRef}
     sections={LIKE}
     keyExtractor={(item) => item.id}
     stickySectionHeadersEnabled={false}
     renderItem={({ item }) => (
      <Link href={`/stars/${item.id}`} asChild>
       <StationLike data={item} />
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