import { CategoryProps } from "@/@types";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export function CategoryLines({ title, isSelected, ...rest }: CategoryProps) {
 return (
  <Pressable
   style={styles.buttonCategory}
   {...rest}
  >
    <Text style={styles.textCategory}>{title}</Text>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 buttonCategory: {
  backgroundColor: "#41506b",
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: "center",
  borderRadius: 8,
  height: 12,
 },
 textCategory: {
  color: colors.white,
  fontFamily: fontFamily.medium,
  fontSize: 12,
 },
})