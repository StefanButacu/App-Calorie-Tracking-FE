export const authConfig = (token?: string) => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
    }
})

// export const baseURL = process.env.REACT_APP_JAVA_API_URL;
export const baseURL =' http://172.22.130.165:8080';

// export const basePythonURL = process.env.REACT_APP_PYTHON_API_URL
export const basePythonURL =' http://172.22.130.165:5000'