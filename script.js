document.getElementById("searchbtn").addEventListener("click", searchCity);


// An object that stores the weather codes and its values
const weatherCodeMap = {
   
  0: {Condition: "Clear sky", dayIcon: "☀️", nightIcon: "🌙"},


  1: {Condition: "Mainly clear", dayIcon: "🌤️", nightIcon: "🌙"},
  2: {Condition: "Partly cloudy", dayIcon: "⛅", nightIcon: "☁️"},
  3: {Condition: "Overcast", dayIcon: "☁️", nightIcon: "☁️"},

  45: {Condition: "Fog", dayIcon: "🌫️", nightIcon: "🌫️"},
  48: {Condition: "Depositing rime fog", dayIcon: "🌫️", nightIcon: "🌫️"},

  51: {Condition:"Light drizzle", dayIcon: "🌦️", nightIcon: "🌧️"},
  53: {Condition: "Moderate drizzle", dayIcon: "🌦️", nightIcon: "🌧️"},
  55: {Condition: "Dense drizzle", dayIcon: "🌦️", nightIcon: "🌧️"},
  56: {Condition: "Light freezing drizzle", dayIcon: "🌨️", nightIcon: "🌨️"},
  57: {Condition: "Dense freezing drizzle", dayIcon: "🌨️", nightIcon: "🌨️"},

  61: {Condition: "Slight rain", dayIcon: "🌧️", nightIcon: "🌧️"},
  63: {Condition: "Moderate rain", dayIcon: "🌧️", nightIcon: "🌧️"},
  65: {Condition: "Heavy rain", dayIcon: "🌧️", nightIcon: "🌧️"},
  66: {Condition: "Light freezing rain", dayIcon: "🧊", nightIcon: "🧊"},
  67: {Condition: "Heavy freezing rain", dayIcon: "🧊", nightIcon: "🧊"},

  71: {Condition: "Slight snow fall", dayIcon: "❄️", nightIcon: "❄️"},
  73: {Condition: "Moderate snow fall", dayIcon: "❄️", nightIcon: "❄️"},
  75: {Condition: "Heavy snow fall", dayIcon: "❄️", nightIcon: "❄️"},
  77: {Condition: "Snow grains", dayIcon: "🌨️", nightIcon: "🌨️"},

  80: {Condition: "Slight rain showers", dayIcon: "🌧️", nightIcon: "🌧️"},
  81: {Condition: "Moderate rain showers", dayIcon: "🌧️", nightIcon: "🌧️"},
  82: {Condition: "Violent rain showers", dayIcon: "🌧️", nightIcon: "🌧️"},
  85: {Condition: "Slight snow showers", dayIcon: "🌨️", nightIcon: "🌨️"},
  86: {Condition: "Heavy snow showers", dayIcon: "🌨️", nightIcon: "🌨️"},

  95: {Condition: "Thunderstorm", dayIcon: "⛈️", nightIcon: "⛈️"},
  96: {Condition: "Thunderstorm with slight hail", dayIcon: "⛈️", nightIcon: "⛈️"},
  99: {Condition: "Thunderstorm with heavy hail", dayIcon: "⛈️", nightIcon: "⛈️"}

};
           
      // A fucntion used to efficiently pick the correct weather code 
      function getWeatherCondition(code){
      return weatherCodeMap[code];


      }

// Use the input button to initiate the search function
let input = document.getElementById("cityInput");


input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    searchCity();
  }
});



//the search function
function searchCity(){

      document.getElementById("errorMessage").textContent = "";
    document.getElementById("showMessage").textContent = "Loading weather...";

  
   //Get the city name the user typed into the input field
    let search = document.getElementById("cityInput").value.trim();
      

    //Ensures function can handle null input
    if(search === ""){
      document.getElementById("errorMessage").textContent = "Enter a city name";
      document.getElementById("showMessage").textContent = "";
      return;

    }
   
    // Get coordinates from the city name
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}`)
    
    .then(response => response.json())
    .then(data => { 
        if(!data.results){
          document.getElementById("errorMessage").textContent = "City not found!";
          document.getElementById("showMessage").textContent = "";
          return;
        }
       


      let latitude = data.results[0].latitude;
      let longitude = data.results[0].longitude;
      
      
      // Get weather data using the coordinates
     fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day,apparent_temperature&hourly=temperature_2m,weather_code,is_day`)
    .then(response => response.json())
    .then(weatherData => {          

      document.getElementById("showMessage").textContent = "";
          
      document.getElementById("cityName").textContent = data.results[0].name + ", ";
      document.getElementById("countryCode").textContent = data.results[0].country_code;

      

    let date = new Date(weatherData.current.time);

        
      let formatter = Intl.DateTimeFormat('en-GB',{
      weekday: 'long',
      day: 'numeric',
      month: 'short',
  
      });
  
      document.getElementById("date").textContent = formatter.format(date);


      document.getElementById("temp").textContent = weatherData.current.temperature_2m  + "°";

      let weather = getWeatherCondition(weatherData.current.weather_code);
     
      document.getElementById("weatherCode").textContent = weather.Condition;

     
      if(weatherData.current.is_day === 1){
        document.getElementById("icon").textContent = weather.dayIcon;
      }

      else{
        document.getElementById("icon").textContent = weather.nightIcon;
      }
     

      document.getElementById("humidity").textContent =  weatherData.current.relative_humidity_2m + "%";
      document.getElementById("wind").textContent =  weatherData.current.wind_speed_10m + " km/h"; 

      document.getElementById("feels-like").textContent = weatherData.current.apparent_temperature + "°";

      //---Forecast data---
      document.getElementById("forecast-container").innerHTML = "";

      
      let now = new Date();
      let startIndex = weatherData.hourly.time.findIndex(t => new Date(t) >= now);
       for(let i = startIndex; i < startIndex + 5; i++){
        
         let formatter = Intl.DateTimeFormat('en-GB',{hour: 'numeric', hour12: 'true'});
        let time = new Date(weatherData.hourly.time[i]);      

        
        let code = getWeatherCondition(weatherData.hourly.weather_code[i]);
        let icon
        if(weatherData.hourly.is_day[i] === 1){
        icon = code.dayIcon;
      }

      else{
        icon = code.nightIcon;
      }

        let temperature = weatherData.hourly.temperature_2m[i];
              
         let formattedTime = formatter.format(time).replace(' ', '').toUpperCase();

      let forecast = document.createElement("div");
      forecast.innerHTML = `

      <p class = "forecast-time">${formattedTime}</p>
      <p class = "forecast-code">${icon}</p>
      <p class = "forecast-temp">${temperature}°</p>

      
      `;

      document.getElementById("forecast-container").appendChild(forecast);


      }

      });

    }); 

}
document.getElementById("cityInput").value = "Nairobi";
searchCity();




