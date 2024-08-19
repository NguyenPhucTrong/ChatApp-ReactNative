import React, { useState } from 'react'
import { ChannelList } from 'stream-chat-expo'
import { router } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';


export default function MainTabScreen() {

    const { user } = useAuth();

    if (!user) {
        return null
    }

    return <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />

}