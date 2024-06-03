import { useEffect, useState } from 'react'
import { StyleSheet,View, Text } from 'react-native'
import { useLinkTo } from '@react-navigation/native'
import { Button } from '@/components/button'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { fetchTest } from '@/lib/api'

export default function MyStation() {

 const linkTo = useLinkTo()

 return (
  <>
  <View style={styles.container}>
    <Text style={styles.text}>My Station</Text>

      <Button onPress={() => linkTo("/")}>
        <Button.Text>Home</Button.Text>
      </Button>
    </View>
  </>
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
})