import { PropsInput } from "@/@types";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

function Input({ children }: PropsInput) {
 return (
  <View style={styles.container}>
   {children}
  </View>
 )
}

function Field({ ...rest }:TextInputProps) {
 return (
  <TextInput
   style={styles.input}
   placeholderTextColor={colors.input}
   {...rest}
  />
 )
}

const styles = StyleSheet.create({
 container: {
  width: "100%",
  height: 56,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  padding: 12,
  borderLeftWidth: 4,
  borderRightWidth: 4,
  borderTopWidth: 4,
  borderBottomWidth: 4,
  borderColor: colors.primary,
  borderRadius: 10,
 },
 input: {
  flex: 1,
  color: colors.white,
  fontFamily: fontFamily.regular,
 },
})

Input.Field = Field

export { Input }