let api = {
    key: "7217d86db3fc864201ba0dd62de41500",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", getInput);

let search = document.querySelector(".search");
let btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput(event){
    event.preventDefault();
    if(event.type == "click"){
        getData(search.value);
    }
}
function getData(city){
    fetch(`${api.base}weather?q=${city}&appid=${api.key}`)
    .then(response => response.json())
    .then(displayData)
    .catch(error => {
        console.error("Error fetching data:", error);
        let errorElement = document.querySelector(".error");
        errorElement.textContent = "Unable to fetch weather data. Please check the city name and try again.";
    });
}
function displayData(response){
    if(response.cod === "404"){
        let error = document.querySelector(".error");
        error.textContent = "Please enter a valid city name";
        search.value = "";
    }else{
        let city = document.querySelector(".city");
        city.textContent = `${response.name}, ${response.sys.country}`;
        let date = document.querySelector(".date");
        let today = new Date();
        date.textContent = getDate(today);
        let temp = document.querySelector(".temp");
        temp.textContent = `Temp: ${Math.round(response.main.temp - 273.15)}°C`
        temp.classList.add("weather-label"); 

        let weather = document.querySelector(".weather")
        weather.textContent = `Weather: ${response.weather[0].main}`
        weather.classList.add("weather-label");

        let tempRange = document.querySelector(".temp-range")
        tempRange.textContent = `Temp Range: ${Math.round(response.main.temp_min - 273.15)}°C / ${Math.round(response.main.temp_max - 273.15)}°C`
        tempRange.classList.add("weather-label");

        let weatherIcon = document.querySelector(".weather-icon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    }
}
function getDate(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`
}
