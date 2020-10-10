const form = document.querySelector("form");
const search = document.querySelector("input");
const temperature = document.getElementById("temp");
const loc = document.getElementById("loc");
const feelslike = document.getElementById("feelslike");
const desc = document.getElementById("desc");
const err = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationInput = search.value;

  err.innerHTML = "";
  temperature.innerHTML = "";
  loc.innerHTML = "";
  feelslike.innerHTML = "";
  desc.innerHTML = "";
  loc.innerHTML = "Loading...";

  fetch(`http://localhost:3000/weather?location=${locationInput}`).then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.error) {
          loc.innerHTML = "";
          temperature.innerHTML = "";
          loc.innerHTML = "";
          feelslike.innerHTML = "";
          desc.innerHTML = "";
          err.innerHTML = data.error;
        } else {
          loc.innerHTML = data.location;
          temperature.innerHTML = data.forecastData.temperature + "°C";
          feelslike.innerHTML =
            "Feels like " + data.forecastData.feelslike + "°C";
          desc.innerHTML = data.forecastData.weatherDescription;
        }
      });
    }
  );

  search.value = "";
});
