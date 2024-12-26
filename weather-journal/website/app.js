const apiKey = '<your_api_key>&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

const generate = document.getElementById('generate');
generate.addEventListener('click', performAction);

async function performAction() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const newDate = new Date().toLocaleDateString();

    const weatherData = await getWeather(baseURL, zip, apiKey);
    
    if (weatherData) {
        await postData('/add', {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: feelings
        });
        updateUI();
    }
}

const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}${zip}&appid=${key}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)} degrees`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    } catch (error) {
        console.log('error', error);
    }
};
