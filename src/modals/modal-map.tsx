import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import { useLinkTo } from "@react-navigation/native";

type ModalProps = {
 handleClose: () => void
}

export function ModalMap({ handleClose }: ModalProps) {

    const linkTo = useLinkTo()

 return (
  <SafeAreaView style={styles.container}>
   <TouchableOpacity 
    style={styles.buttonModal}
    onPress={handleClose}
   ></TouchableOpacity>

   <View style={styles.content}>
    <TouchableOpacity
     style={styles.actionButton}
     activeOpacity={0.8}
     onPress={() => linkTo("/map-metro")}
    >
     <Text style={styles.actionText}>Metro Map</Text>
    </TouchableOpacity>

    <TouchableOpacity
     style={styles.actionButton}
     activeOpacity={0.8}
     onPress={() => linkTo("/map-turism")}
    >
     <Text style={styles.actionText}>Turism Map</Text>
    </TouchableOpacity>
   </View>
  </SafeAreaView>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 buttonModal: {
  flex: 1, 
  zIndex: 9,
 },
 content: {
  marginVertical: 20,
  marginLeft: 10,
  marginRight: 10,
 },
 actionButton: {
  zIndex: 99,
  backgroundColor: colors.primary,
  borderRadius: 6,
  marginTop: 8,
  padding: 12,
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.2)',
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffset: {
   width: 0,
   height: 2,
  },
  elevation: 5,
  shadowOpacity: 0.28,
  shadowRadius: 4,
 },
 actionText: {
  textAlign: "center",
  fontFamily: fontFamily.medium,
 },
})