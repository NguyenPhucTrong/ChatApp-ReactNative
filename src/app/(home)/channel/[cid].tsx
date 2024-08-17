import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo';


export default function ChannelScreen() {
    const [channel, setChannel] = useState<ChannelType | null>(null);
    const { cid } = useLocalSearchParams<{ cid: string }>();
    const { client } = useChatContext();

    useEffect(() => {
        const fetchChannel = async () => {
            const channels = await client.queryChannels({ cid });
            setChannel(channels[0]);
        }
        fetchChannel();

    }, [cid])

    if (!channel) {
        return <ActivityIndicator />
    }

    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
    )
}