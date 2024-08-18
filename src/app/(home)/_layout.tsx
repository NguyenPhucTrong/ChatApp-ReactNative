import { useAuth } from "@/src/providers/AuthProvider";
import ChatProvider from "@/src/providers/ChatProvider";
import { Redirect, Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from "stream-chat-expo";

export default function HomeLayout() {
    const { user } = useAuth();
    if (!user) {
        return <Redirect href="/(auth)/Login" />
    }

    return (

        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false
                }} />
            </Stack>
        </ChatProvider>


    )
}