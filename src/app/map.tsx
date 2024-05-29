import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useLinkTo } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import {
 requestForegroundPermissionsAsync,
 getCurrentPositionAsync,
 LocationObject,
 watchPositionAsync,
 LocationAccuracy
} from 'expo-location'
import { colors } from '@/theme/colors'
import { AntDesign } from '@expo/vector-icons';

// latitud 40.4165 longitud -3.70256

export default function Map() {

 const [ location, setLocation ] = useState<LocationObject | null>(null);

 const linkTo = useLinkTo()

 // Checking user permission
 /*async function requestLocationPermissions() {
  const { granted } = await requestForegroundPermissionsAsync();

  if(granted) {
   const currentPosition = await getCurrentPositionAsync();
   setLocation(currentPosition);
   console.log(currentPosition);
  }
 }

 useEffect(() => {
  requestLocationPermissions();
 }, []);*/

 useEffect(() => {
  watchPositionAsync({
   accuracy: LocationAccuracy.Highest,
   timeInterval: 1000,
   distanceInterval: 1
  }, (response) => {
   console.log("Nova Localização", response)
   setLocation(response);
  });
 }, []);

 return (
  <>
  <View style={styles.container}>
   <MapView
    style={styles.map}
    initialRegion={{
     latitude: 40.4165,
     longitude: -3.70256,
     latitudeDelta: 0.005,
     longitudeDelta: 0.005
    }}
   >
    <Marker
     coordinate={{
      latitude: 40.4165,
      longitude: -3.70256,
     }}
    />
    <View style={styles.containerWarning}>
    <TouchableOpacity style={styles.warning} activeOpacity={0.8}>
    <AntDesign name="arrowleft" size={30} color={colors.white} onPress={() => linkTo("/")} />
    </TouchableOpacity>
    </View>
   </MapView>
  </View>
  </>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  //alignItems: "center",
  backgroundColor: colors.background,
 },
 map: {
  flex: 1,
  width: '100%',
 },
 containerWarning: {
  alignItems: "flex-start",
  justifyContent: "center",
 },
 warning: {
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 30,
  marginTop: 70,
  backgroundColor: colors.primary,
  width: 50,
  height: 50,
  borderRadius: 50,
 }, 
})