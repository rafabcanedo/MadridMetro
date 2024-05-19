import { useEffect, useState } from 'react'
import { StyleSheet,View, Text, FlatList, ListRenderItem, ActivityIndicator } from 'react-native'
import { theme } from '@/theme'
import { Button } from '@/components/button'
import { useQuery } from '@tanstack/react-query'
import { api, getLines } from '@/lib/api'

export default function Test() {

 const { data: stops, isLoading, error } = useQuery({
  queryKey: ['stops'],
  queryFn: getLines,
 })

 if (isLoading) {
  return <ActivityIndicator />;
 }

 if (error) {
  return <Text>Error</Text>
 }

 return (
  <>
   <View style={styles.container}>
   <FlatList 
    data={stops}
    renderItem={({ item }) => (
     <View>
      <Text style={styles.text}>{item.name}</Text>
     </View>
    )}
   />
   </View>
  </>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  //alignItems: "center",
  backgroundColor: theme.colors.background,
 },
 text: {
  fontSize: 22,
  fontFamily: theme.fontFamily.bold,
  color: '#000000'
 },
})