import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from "stream-chat-expo";


const client = StreamChat.getInstance('n48srheazzme');


export default function HomeLayout() {

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

            /**
             *  Channel created using a channel id
             */
            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });
            // await channel.create();
        }
        connect();
    })


    return (
        <OverlayProvider>
            <Chat client={client}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{
                        headerShown: false
                    }} />
                </Stack>
            </Chat>
        </OverlayProvider>

    )
}