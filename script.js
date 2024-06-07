const cityName = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
const Card = document.querySelector(".card");
const API_KEY = `bef4d7708fbfaa027037abad73189779`;

weatherForm.addEventListener("submit",async event => {
    event.preventDefault();

    const city = cityName.value.trim();
    
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        } catch (error) {
            console.error(error);
        }
    }else{
        displayError("Please Enter a City");
    }
});

async function getWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Could Not Fetch Data");
    }
    return await response.json();
}

function displayWeather(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description,icon}]
    } = data;

    Card.innerHTML = "";

    Card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("img");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    descDisplay.textContent = description;
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("desc");
    emojiDisplay.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    //emojiDisplay.classList.add("weatherEmoji");

    Card.appendChild(cityDisplay);
    Card.appendChild(tempDisplay);
    Card.appendChild(humidityDisplay);
    Card.appendChild(descDisplay);
    Card.appendChild(emojiDisplay);

    
}

function  getWeatherEmoji(id){

}

function displayError(error){
    const errorElement = document.createElement('p');
    errorElement.textContent = error;
    errorElement.classList.add("errorDisplay");

    Card.textContent = "";
    Card.style.display = "flex";  
    Card.appendChild(errorElement);
}
