import { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StationProps } from "@/@types/index";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export const Station = forwardRef<TouchableOpacity, StationProps>(({ data, ...rest }, ref ) => {
 return (
  <TouchableOpacity
   ref={ref}
   style={styles.container}
   {...rest}
  >

  <View style={[styles.containerSecond, styles.shadowContainer]}>
   <View style={styles.containerTitle}>
    <Text style={styles.title}>
     {data.title}
    </Text>
    <Text style={styles.number}>
     {data.number}
    </Text>
   </View>

   <Text style={styles.description}>
    {data.description}
   </Text>
  </View>

  </TouchableOpacity>
 )
})

const styles = StyleSheet.create({
 container: {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: 16,
 },
 containerSecond: {
  flex: 1,
  marginLeft: 12,
  gap: 12,
  marginTop: 16,
  height: 80,
  backgroundColor: colors.background,
  borderRadius: 10,
 },
 shadowContainer: {
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
 },
 containerTitle: {
  flexDirection: "row",
  alignItems: "center",
 },
 title: {
  flex: 1,
  color: colors.white,
  fontFamily: fontFamily.medium,
  fontSize: 18,
  marginLeft: 6,
 },
 number: {
  color: colors.white,
  fontFamily: fontFamily.regular,
  fontSize: 16,
  marginRight: 12,
 },
 description: {
  color: colors.white,
  fontFamily: fontFamily.regular,
  lineHeight: 18,
  marginTop: 2,
  marginLeft: 6,
 },
})