const API_KEY = "fba197f32b3754efb6ac25341944e48a";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");

  if (!city) {
    error.textContent = "Please enter a city name.";
    return;
  }

  error.textContent = "";

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to get weather data");
    }

    document.getElementById("city").textContent =
      `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").textContent =
      `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").textContent =
      data.weather[0].description;

    document.getElementById("humidity").textContent =
      data.main.humidity;

    document.getElementById("wind").textContent =
      `${data.wind.speed} m/s`;

    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  } catch (err) {
    console.error(err);
    error.textContent = err.message;
  }
}
