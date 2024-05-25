import { useState } from 'react'
import { StyleSheet,View, Text, ScrollView } from 'react-native'
import { theme } from '@/theme'
import { Button } from '@/components/button'
import { colors } from '@/theme/colors'
import { useLinkTo } from '@react-navigation/native'
import { Input } from '@/components/input'
import { Header } from '@/components/header'
import { Filters } from '@/components/filters/filters'
import { FILTERS } from "@/utils/filters";

export default function SearchRoute() {

 const [ filter, setFilter ] = useState(FILTERS[0])
 
 const linkTo = useLinkTo()

 return (
  <ScrollView
   showsVerticalScrollIndicator={false}
  >
   <View style={styles.container}>
    <Header href="/" />

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
    />
    </Input>

    <Input>
    <Input.Field
     placeholder="Select your destine"
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
    </Input>

    <Input>
    <Input.Field
     placeholder="Select your destine"
    />
    </Input>
    </View>

    <Button onPress={() => linkTo("/")}>
     <Button.Text>Search Route</Button.Text>
    </Button>
    </View>
    </ScrollView>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: theme.colors.background,
  padding: 12,
  paddingTop: 52,
 },
 title: {
  fontSize: 22,
  fontFamily: theme.fontFamily.bold,
  color: colors.white,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
 },
 containerRoute: {
  borderBottomWidth: 2,
  borderBottomColor: theme.colors.white,
  marginBottom: 14,
 },
 titleRoute: {
  color: theme.colors.white,
  paddingLeft: 8,
  marginTop: 16,
 },
})