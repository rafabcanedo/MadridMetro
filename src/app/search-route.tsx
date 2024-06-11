import { useState } from 'react'
import { StyleSheet,View, Text, ScrollView, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button } from '@/components/button'
import { useLinkTo } from '@react-navigation/native'
import { Input } from '@/components/input'
import { Header } from '@/components/header'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { Filters } from '@/components/filters/filters'
import { FILTERS } from "@/utils/filters";

import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper'

const KEY_GPT = process.env.KEY_CHAT_GPT

export default function SearchRoute() {

 const [ filter, setFilter ] = useState(FILTERS[0])
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

   const prompt = `Estou em Madrid, estou localizado na estação ${location} e gostaria de ir a estação ${destine}. Quais estações eu tenho que pegar? Me retorne só os nomes das estacoes em forma de lista`

   fetch("https://api.openai.com/v1/chat/completions", {
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
    })
 }
 
 const linkTo = useLinkTo()

 return (
   <>
   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
    <Header href="/" />
    <ScrollView
     showsVerticalScrollIndicator={false}
    >

    <Text style={styles.title}>Search your Route</Text>

    <View style={styles.containerRoute}>
    <Text style={styles.titleRoute}>From</Text>
    </View>

    <Filters
     filters={FILTERS}
     filter={filter}
     onChange={setFilter}
    />

    <View style={{ marginTop: 10, gap: 10, marginBottom: 20 }}>
    <Input>
    <Input.Field
     placeholder="Select your role"
     value={location}
     onChangeText={(text) => setLocation(text)}
    />
    <Entypo 
     name="location-pin"
     size={20} 
     color={colors.primary}
    />
    </Input>

    <Input>
    <Input.Field
     placeholder="Select your destine"
     value={destine}
     onChangeText={(text) => setDestine(text)}
    />
    </Input>
    </View>

    <View style={styles.containerRoute}>
    <Text style={styles.titleRoute}>To</Text>
    </View>

    <Filters
     filters={FILTERS}
     filter={filter}
     onChange={setFilter}
    />

   <View style={{ marginTop: 10, gap: 10, marginBottom: 20 }}>
    <Input>
    <Input.Field
     placeholder="Select your role"
    />
    <Entypo 
     name="location-pin"
     size={20} 
     color={colors.primary}
    />
    </Input>

    <Input>
    <Input.Field
     placeholder="Select your destine"
    />
    </Input>
    </View>

    <Button onPress={handleGenerate}>
     <Button.Text>Search Route</Button.Text>
    </Button>
    </ScrollView>

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
  justifyContent: "center",
  backgroundColor: colors.background,
  padding: 12,
  paddingTop: 52,
 },
 title: {
  fontSize: 22,
  fontFamily: fontFamily.bold,
  color: colors.white,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
 },
 containerRoute: {
  borderBottomWidth: 2,
  borderBottomColor: colors.white,
  marginBottom: 14,
 },
 titleRoute: {
  color: colors.white,
  paddingLeft: 8,
  marginTop: 16,
 },
 containerScroll: {
   width: "90%",
   marginTop: 8,
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
})