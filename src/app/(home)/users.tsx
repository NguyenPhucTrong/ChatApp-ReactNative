import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/ supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import UserListItem from '@/src/components/UserListItem';

export default function UserScreen() {
    const [users, setUsers] = useState<any[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {

            if (!user) {
                return;
            }

            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .neq("id", user.id);

            if (!profiles) {
                return;
            }
            setUsers(profiles);


        }
        fetchUsers();
    }, [])

    return (
        <FlatList
            data={users}
            contentContainerStyle={{ gap: 5 }}
            renderItem={({ item }) => <UserListItem user={item} />}

        />
    )
}