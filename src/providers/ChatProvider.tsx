import { View, Text, ActivityIndicator } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/ supabase';
import { tokenProvider } from '../utils/tokenProvider';


const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {

    const [isReady, setIsReady] = useState(false);
    const { profile } = useAuth();

    useEffect(() => {

        if (!profile) {
            return;
        }

        const connect = async () => {
            if (client.user) {
                await client.disconnectUser();
            }


            await client.connectUser(
                {
                    id: profile.id,
                    name: profile.full_name,
                    image: supabase.storage
                        .from('avatars')
                        .getPublicUrl(profile.avatar_url).data.publicUrl,
                },
                tokenProvider
            );

            setIsReady(true);

            /**
             *  Channel created using a channel id
             */
            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });
            // await channel.create();
        };
        connect();

        return () => {
            if (isReady) {
                client.disconnectUser();
            }
            setIsReady(false);
        }

    }, [profile?.id]);


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
