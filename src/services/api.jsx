export const fetchAposentadorias = async() => {

    const response = await fetch('./api.json');
    const data = await response.json();
    console.log(data)
    return data;
};