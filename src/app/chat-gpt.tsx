import { Header } from "@/components/header";
import { Title } from "@/components/title";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import { 
 StyleSheet, 
 Text, 
 TouchableOpacity, 
 View, 
 TextInput,
 ScrollView,
 TouchableWithoutFeedback,
 Keyboard,
} from "react-native";

export default function ChatGpt() {
 return (
 <>
 <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <View style={styles.container}>
   
   <Title title="Your questions with Chat Gpt" />

   <View style={styles.containerArea}>
    <TextInput
     placeholder="Tell me what your question..."
     style={styles.textArea}
     multiline={true}
     numberOfLines={6}
    />
   </View>

   <TouchableOpacity
    style={styles.buttonChat}
    activeOpacity={0.8}
   >
    <Text style={styles.textButton}>Send</Text>
   </TouchableOpacity>
   
   <ScrollView>
    <View style={styles.content}>
     <Text style={styles.titleContent}>Content Ia 🚇</Text>
     <Text>I don know...</Text>
    </View>
   </ScrollView>
   </View>
   
   </TouchableWithoutFeedback>
 </>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  backgroundColor: colors.background,
  paddingTop: 52,
 },
 containerArea: {
  width: "100%",
  height: 90,
  borderLeftWidth: 2,
  borderRightWidth: 2,
  borderTopWidth: 2,
  borderBottomWidth: 2,
  borderColor: colors.gray,
  borderRadius: 10,
  padding: 8,
 },
 textArea: {
  flex: 1,
  color: colors.white,
  fontFamily: fontFamily.regular,
  fontSize: 16
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
 content: {
  backgroundColor: colors.white,
  padding: 16,
  width: "100%",
  marginTop: 15,
 },
 titleContent: {
  
 },
})