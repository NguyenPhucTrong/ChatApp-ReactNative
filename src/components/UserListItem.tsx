import { View, Text } from 'react-native'
import React from 'react'

interface User {
    full_name: string
}

export default function UserListItem({ user }: { user: User }) {
    return (
        <View style={{ padding: 15, backgroundColor: "white" }} >
            <Text style={{ fontWeight: "600" }} >{user.full_name}</Text>
        </View>
    )
}