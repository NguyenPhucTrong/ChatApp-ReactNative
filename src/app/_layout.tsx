
import { Slot, Stack } from "expo-router";
//GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
            <Slot />
        </GestureHandlerRootView>
    );
}