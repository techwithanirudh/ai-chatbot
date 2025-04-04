'use server';
import 'server-only';
import { cookies } from 'next/headers';

export async function getBaasApiKey() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;

    if (!jwt) return null;

    const response = await fetch(
        'https://api.meetingbaas.com/accounts/api_key',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `jwt=${jwt}`,
            },
        },
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.api_key;
}