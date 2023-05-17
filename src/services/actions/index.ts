export const authConfig = (token?: string) => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
    }
})

// export const baseURL = process.env.REACT_APP_JAVA_API_URL;
export const baseURL =' http://192.168.17.14:8080';

// export const basePythonURL = process.env.REACT_APP_PYTHON_API_URL
export const basePythonURL =' http://192.168.17.14:5000'