import { Header } from "@/components/header";
import { Title } from "@/components/title";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChatGpt() {
 return (
  <View style={styles.container}>
  <Header href="/" />
   
   <Title title="Your questions with Chat Gpt" />

   <TouchableOpacity
    style={styles.buttonChat}
    activeOpacity={0.8}
   >
    <Text style={styles.textButton}>Send</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: colors.background,
  padding: 12,
  paddingTop: 52,
 },
 buttonChat: {
  backgroundColor: colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  padding: 12,
  borderRadius: 10,
 },
 textButton: {
  color: colors.white,
  fontFamily: fontFamily.medium,
  fontSize: 18,
  marginRight: 0.5,
  marginLeft: 0.5,
 },
})