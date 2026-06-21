import { Stack } from 'expo-router';

export default function MyStationsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[lineId]/index" options={{ headerShown: false }} />
    </Stack>
  );
}
