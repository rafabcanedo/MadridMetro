import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { FilterProps } from "@/@types";
import { theme } from "@/theme";

export function Filter({ filter, selected, ...rest }: PressableProps & FilterProps) {
 return (
  <Pressable 
   style={[styles.pressable, selected && styles.presableSelected]} 
   {...rest}
  >
   <Text style={styles.text}>{filter}</Text>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 pressable: {},
 text: {
  color: theme.colors.white,
  fontSize: 16,
  fontFamily: theme.fontFamily.medium,
 },
 presableSelected: {
  borderBottomWidth: 4,
  borderBottomColor: theme.colors.white,
 },
})