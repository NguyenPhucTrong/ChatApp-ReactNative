import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'

export default function AuthLayout() {

    const { user } = useAuth();
    // console.log(user)

    if (user) {
        return <Redirect href="/(home)/(tabs)/profile" />
    }

    return (
        <Stack />
    )
}