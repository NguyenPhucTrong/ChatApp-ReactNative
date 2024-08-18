import { View, Text, ActivityIndicator } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';


const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const connect = async () => {
            await client.connectUser(
                {
                    id: 'jlahey',
                    name: 'Jim Lahey',
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey'),
            );

            setIsReady(true);

            /**
             *  Channel created using a channel id
             */
            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });
            // await channel.create();
        }
        connect();

        return () => {
            client.disconnectUser();
            setIsReady(false);
        }

    }, []);

    if (!isReady) {
        return <ActivityIndicator />
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                {children}
            </Chat>
        </OverlayProvider>
    )
}
