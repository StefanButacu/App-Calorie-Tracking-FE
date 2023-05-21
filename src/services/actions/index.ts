export const authConfig = (token?: string) => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
    }
})

export const baseURL = "http://localhost:8080";
// export const baseURL =' http://10.152.4.129:8080';
//
export const basePythonURL = "http://localhost:5000"
// export const basePythonURL =' http://10.152.4.129:5000'