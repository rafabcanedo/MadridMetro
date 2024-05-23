import { useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { colors } from "@/theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { fontFamily } from "@/theme/fontFamily";

export function ModalMap() {

 const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

 const bottomSheetRef = useRef<BottomSheet>(null);

  //const handleClosePress = () => bottomSheetRef.current?.close();
 const handleOpenPress = () => bottomSheetRef.current?.expand();

 return (
  <TouchableOpacity 
    style={styles.card} 
    activeOpacity={0.5}
    onPress={handleOpenPress}
   >
   <FontAwesome name="map-o" size={30} color={colors.white} />
   <Text style={styles.text}>Maps</Text>
  <View>
   <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
    <View>
     <Text>This is awesome!</Text>
    </View>
   </BottomSheet>
  </View>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  padding: 24,
  backgroundColor: colors.error,
 },
 card: {
    //alignItems: "center",
    flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
    gap: 12,
 },
 text: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
    color: colors.white,
   },
})