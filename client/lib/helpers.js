const handleError = (err) => {
    console.error("API request failed", err);
    throw err; 
}

const handleResponse = async (res) => {
    try {
        const data = await res.json(); 
        return data; 
    }
    catch (err) {
        console.error("Failed to parse response as JSON", err);
        throw err; 
    } 
}

export { handleError, handleResponse }