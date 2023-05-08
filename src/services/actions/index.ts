export const authConfig = (token?: string) => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
    }
})

