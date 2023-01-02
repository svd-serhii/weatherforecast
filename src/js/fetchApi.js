import { API_KEY, BASE_URL } from './refs';
import { getRefs } from './refs';

const refs = getRefs();
let lon;
let lat;
refs.btnP.addEventListener('click', () => {
  getLocation();
});
refs.btnF.addEventListener('click', () => {
  fetchWeather();
});

function getLocation(e) {
  navigator.geolocation.getCurrentPosition(position => {
    refs.longitude.value = position.coords.longitude.toFixed(2);
    refs.latitude.value = position.coords.latitude.toFixed(2);
    console.log(position);
  });
}

function fetchWeather(position) {
  lon = refs.longitude.value;
  lat = refs.latitude.value;
  let key = API_KEY;
  let lang = 'en';
  let units = 'metric';
  let url = `${BASE_URL}?lat=${lat}&lon=${lon}&cnt=40&appid=${key}&units=${units}&lang=${lang}`;
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderWeather(data);
    })
    .catch(console.error);
}

function renderWeather(e) {
  refs.row.innerHTML = e.cnt
    .map((day, idx) => {
      if (idx <= 2) {
        let dt = new Date(day.dt * 1000);
        let sr = new Date(day.sunrise * 1000).toTimeString();
        let ss = new Date(day.sunset * 1000).toTimeString();
        return `<div class="col">
              <div class="card">
              <h2 class="card-title p-2">${dt.toDateString()}</h2>
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
          day.temp.min
        }&deg;C</p>
                  <p class="card-text">High Feels like ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${day.pop * 100}%</p>
                  <p class="card-text">Dewpoint ${day.dew_point}</p>
                  <p class="card-text">Wind ${day.wind_speed}m/s, ${
          day.wind_deg
        }&deg;</p>
                  <p class="card-text">Sunrise ${sr}</p>
                  <p class="card-text">Sunset ${ss}</p>
                </div>
              </div>
            </div>
          </div>`;
      }
    })
    .join(' ');
}

//     () => {
//   let long;
//   let lat;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       long = position.coords.longitude;
//       lat = position.coords.latitude;
//       const base = `${BASE_URL}lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

//       // Using fetch to get data
//       fetch(base)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           const { temp, feels_like } = data.main;
//           const place = data.name;
//           const { description, icon } = data.weather[0];
//           const { sunrise, sunset } = data.sys;

//           const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//           // const fahrenheit = (temp * 9) / 5 + 32;

//           // Converting Epoch(Unix) time to GMT
//           const sunriseGMT = new Date(sunrise * 1000);
//           const sunsetGMT = new Date(sunset * 1000);

//           // Interacting with DOM to show data
//           iconImg.src = iconUrl;
//           loc.textContent = `${place}`;
//           desc.textContent = `${description}`;
//           tempC.textContent = `${temp.toFixed(2)} °C`;
//           // tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
//           sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
//           sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
//         });
//     });
//   }
// });

// fetchWeather() {
//   let long;
//   let lat;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       long = position.coords.longitude;
//       lat = position.coords.latitude;
//       const base = `${BASE_URL}lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

//       // Using fetch to get data
//       fetch(base)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           const { temp, feels_like } = data.main;
//           const place = data.name;
//           const { description, icon } = data.weather[0];
//           const { sunrise, sunset } = data.sys;

//           const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//           // const fahrenheit = (temp * 9) / 5 + 32;

//           // Converting Epoch(Unix) time to GMT
//           const sunriseGMT = new Date(sunrise * 1000);
//           const sunsetGMT = new Date(sunset * 1000);
//         });
//     };
//   };
// }
