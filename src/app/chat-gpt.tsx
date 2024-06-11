import { useState } from "react";
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
 Alert,
} from "react-native";
import { ActivityIndicator } from 'react-native-paper';

const KEY_GPT = process.env.KEY_CHAT_GPT

export default function ChatGpt() {

 // const [ content, setContente ] = useState("")
 const [ location, setLocation ] = useState("")
 const [ destine, setDestine ] = useState("")
 const [ loading, setLoading ] = useState(false)
 const [ travel, setTravel ] = useState("")

 async function handleGenerate() {
  if (location === "") {
    Alert.alert("Atenção", "Preencha o campo!")
    return
  }

  setTravel("")
  setLoading(true)
  Keyboard.dismiss()

  //const prompt = `Estou em Madrid, estou localizado na estação ${location.toFixed(0)} e gostaria de ir a estação ${destine}. Quais estações eu tenho que pegar?`

  /*fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY_GPT}`
    },
    body: JSON.stringify({
      modal: "gpt-3.5-turbo-0301",
      messages: [
       {
        role: "user",
        content: prompt,
       }
      ],
      temperature: 0.20,
      max_tokens: 500,
      top_p: 1,
    })
  })
  .then(response => response.json())
  .then((data) => {
   console.log(data.choices[0].message.content)
   setTravel(data.choices[0].message.content)
  })
  .catch((error) => {
   console.log(error)
  })
  .finally(() => {
    setLoading(false)
  })*/
 }

 return (
  <>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      
    <Title title="Your questions with Chat Gpt" />
   
    <View style={styles.containerArea}>
    <TextInput
     placeholder="Where are you?"
     style={styles.textArea}
     value={location}
     onChangeText={(text)=> setLocation(text)}
    />
    </View>

    <View style={styles.containerArea}>
    <TextInput
     placeholder="Where are you going?"
     style={styles.textArea}
     value={destine}
     onChangeText={(text)=> setDestine(text)}
    />
    </View>
   
    <TouchableOpacity
     style={styles.buttonChat}
     activeOpacity={0.8}
     onPress={handleGenerate}
    >
    <Text style={styles.textButton}>Send</Text>
    </TouchableOpacity>
      
     <ScrollView
      style={styles.containerScroll}
      showsVerticalScrollIndicator={false}
     >
      {loading && (
        <View style={styles.content}>
        <Text style={styles.titleContent}>Loading...</Text>
        <ActivityIndicator color={colors.gray} size="large" />
        </View> 
      )}
      {travel && (
        <View style={styles.content}>
        <Text style={styles.titleContent}>Content Ia 🚇</Text>
        <Text>{travel}</Text>
        </View>
      )}
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
  marginTop: 16,
  marginBottom: 8,
 },
 textArea: {
  // flex: 1,
  color: colors.white,
  fontFamily: fontFamily.regular,
  fontSize: 16
 },
 buttonChat: {
  backgroundColor: colors.primary,
  width: "80%",
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
  width: "100%",
  padding: 16,
  marginTop: 15,
  borderRadius: 10,
 },
 titleContent: {
  fontSize: 15,
  fontFamily: fontFamily.medium,
  textAlign: "center",
  marginBottom: 14,
 },
 containerScroll: {
  width: "90%",
  marginTop: 8,
 },
})

/*
 <View style={styles.containerArea}>
    <TextInput
     placeholder="Tell me what your question..."
     style={styles.textArea}
     multiline={true}
     numberOfLines={6}
     value={content}
     onChangeText={(text)=> setContente(text)}
    />
  </View>
*/