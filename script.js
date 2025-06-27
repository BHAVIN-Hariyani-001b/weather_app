const apiKey = "b0c384da4f966edd2d0284eafcdf209e";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherType = {
    1 : "Clouds",
    2 : "Clear",
    3 : "Rain",
    4 : "Drizzle",
    5 : "Mist"
}

async function checkWeathar(city) {
  const respose = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (respose.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await respose.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    console.log(data.weather[0].main);

    // if (data.weather[0].main == "Clouds") {
    //   weatherIcon.src = "weather-app-img/images/Clouds.png";
    // } else if (data.weather[0].main == "Clear") {
    //   weatherIcon.src = "weather-app-img/images/Clear.png";
    // } else if (data.weather[0].main == "Rain") {
    //   weatherIcon.src = "weather-app-img/images/Rain.png";
    // } else if (data.weather[0].main == "Drizzle") {
    //   weatherIcon.src = "weather-app-img/images/Drizzle.png";
    // } else if (data.weather[0].main == "Mist") {
    //   weatherIcon.src = "weather-app-img/images/Mist.png";
    // }

    // **** OR ****

    for(let a in weatherType){
        // console.log(weatherType[a]);
        if(weatherType[a] === data.weather[0].main)
            weatherIcon.src = `weather-app-img/images/${weatherType[a]}.png`;
    }

    // **** OR ****

    // switch (data.weather[0].main) {
    //   case "Clouds":
    //     weatherIcon.src = "weather-app-img/images/Clouds.png";
    //     break;
    //   case "Clear":
    //     weatherIcon.src = "weather-app-img/images/Clear.png";
    //     break;
    //   case "Rain":
    //     weatherIcon.src = "weather-app-img/images/Rain.png";
    //     break;
    //   case "Drizzle":
    //     weatherIcon.src = "weather-app-img/images/Drizzle.png";
    //     break;
    //   case "Mist":
    //     weatherIcon.src = "weather-app-img/images/Mist.png";
    // }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  if (search.value !== "") {
    checkWeathar(search.value);
  } else {
    alert("enter city name");
  }
});
