import { FlatList, StyleSheet } from "react-native";
import { IFilterActivedProps } from "@/@types";
import { Filter } from "./filter";

export function Filters({ filters, filter, onChange }: IFilterActivedProps) {
 return (
  <FlatList
   data={filters}
   keyExtractor={item => item}
   renderItem={({ item }) => (
   <Filter 
    filter={item} 
    selected={item === filter}
    onPress={() => onChange(item)}
   />
   )}
   horizontal
   showsHorizontalScrollIndicator={false}
   style={styles.list}
   contentContainerStyle={styles.content}
  />
 )
}

const styles = StyleSheet.create({
 list: {
  paddingBottom: 4,
  maxHeight: 34,
 },
 content: {
  gap: 24,
  paddingHorizontal: 8,
 },
})