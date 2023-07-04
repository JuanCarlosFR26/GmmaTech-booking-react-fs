export const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const addUser = async (url, email) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: email})
    })
}