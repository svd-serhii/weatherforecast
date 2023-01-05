import { GEO_URL, API_KEY, BASE_URL } from './refs';
import { getRefs } from './refs';

const refs = getRefs();

refs.btnF.addEventListener('click', fetchWeather);

refs.btnP.addEventListener('click', getLocation);

function getLocation(e) {
  let opts = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 60 * 5,
  };
  navigator.geolocation.getCurrentPosition(ftw, wtf, opts);

  function ftw(position) {
    refs.longitude.value = position.coords.longitude.toFixed(2);
    refs.latitude.value = position.coords.latitude.toFixed(2);
    console.log(position);
  }
  function wtf(error) {
    console.log(error);
  }
}

function fetchWeather() {
  let lat = refs.latitude.value;
  let lon = refs.longitude.value;
  let key = API_KEY;
  let lang = 'en';
  let units = 'metric';
  let url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then(data => {
      console.log(data.city);
      //   renderPosition(data);
      renderWeather(data);
    })
    .catch(console.err);
}

function renderWeather(data) {
  console.log(data);
  clearCard();
  const cardMarkup = data.list
    .map((day, idx) => {
      if (idx <= 4) {
        let dt = new Date(day.dt * 1000); //timestamp * 1000
        // let sr = new Date(city.sunrise * 1000).toTimeString();
        // let ss = new Date(city.sunset * 1000).toTimeString();
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
                  <p class="card-text">Current temperature ${day.main.temp.toFixed(
                    0
                  )}&deg;</p>
                  <p class="card-text">Feels like ${day.main.feels_like.toFixed(
                    0
                  )}&deg;C</p>
                  <p class="card-text">Pressure ${day.main.pressure}mb</p>
                  <p class="card-text">Humidity ${day.main.humidity}%</p>
                  <p class="card-text">Wind ${day.wind.speed}m/s, ${
          day.wind.deg
        }&deg;</p>
                
                </div>
              </div>
            </div>
          </div>`;
      }
    })
    .join(' ');

  refs.row.insertAdjacentHTML('beforeend', cardMarkup);
}

function clearCard(data) {
  refs.row.innerHTML = '';
}

// function renderPosition(data) {
//   //   console.log(data);
//   const cityMarkup = data.city
//     .map(name => {
//       return ` <div class="current-position">
//         <h2 class="city-name">Your current city ${name} -</h2>
//       </div>`;
//     })
//     .join('');
//   refs.city.insertAdjacentHTML('beforebegin', cityMarkup);
// }

//   ;
//  <p class="card-text">Sunrise ${sr}</p>
//   <p class="card-text">Sunset ${ss}</p>
