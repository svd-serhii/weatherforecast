!function(){var e={body:document.querySelector("body"),btnP:document.querySelector("#get-location"),btnF:document.querySelector("#get-forecast"),longitude:document.querySelector(".lon"),latitude:document.querySelector(".lat"),row:document.querySelector(" .row"),city:document.querySelector(".forecast-request")};e.btnF.addEventListener("click",(function(){var t=e.latitude.value,n=e.longitude.value,c="".concat("https://api.openweathermap.org/data/2.5/forecast","?lat=").concat(t,"&lon=").concat(n,"&appid=").concat("54314ea03ea88e3952e76d8fb7f8add2","&units=").concat("metric","&lang=").concat("en");fetch(c).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()})).then((function(t){console.log(t.city),function(t){console.log(t),e.row.innerHTML="";var n=t.list.map((function(e,t){if(t<=4){var n=new Date(1e3*e.dt);return'<div class="col">\n              <div class="card">\n              <h2 class="card-title p-2">'.concat(n.toDateString(),'</h2>\n                <img\n                  src="http://openweathermap.org/img/wn/').concat(e.weather[0].icon,'@4x.png"\n                  class="card-img-top"\n                  alt="').concat(e.weather[0].description,'"\n                />\n                <div class="card-body">\n                  <h3 class="card-title">').concat(e.weather[0].main,'</h3>\n                  <p class="card-text">Current temperature ').concat(e.main.temp.toFixed(0),'&deg;</p>\n                  <p class="card-text">Feels like ').concat(e.main.feels_like.toFixed(0),'&deg;C</p>\n                  <p class="card-text">Pressure ').concat(e.main.pressure,'mb</p>\n                  <p class="card-text">Humidity ').concat(e.main.humidity,'%</p>\n                  <p class="card-text">Wind ').concat(e.wind.speed,"m/s, ").concat(e.wind.deg,"&deg;</p>\n                \n                </div>\n              </div>\n            </div>\n          </div>")}})).join(" ");e.row.insertAdjacentHTML("beforeend",n)}(t)})).catch(console.err)})),e.btnP.addEventListener("click",(function(t){navigator.geolocation.getCurrentPosition((function(t){e.longitude.value=t.coords.longitude.toFixed(2),e.latitude.value=t.coords.latitude.toFixed(2),console.log(t)}),(function(e){console.log(e)}),{enableHighAccuracy:!0,timeout:1e4,maximumAge:3e5})}))}();
//# sourceMappingURL=index.6824ef59.js.map