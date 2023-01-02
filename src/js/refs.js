export const API_KEY = '54314ea03ea88e3952e76d8fb7f8add2';
export const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export function getRefs() {
  return {
    body: document.querySelector('body'),
    btnP: document.querySelector('#get-location'),
    btnF: document.querySelector('#get-forecast'),
    longitude: document.querySelector('.lon'),
    latitude: document.querySelector('.lat'),
    row: document.querySelector('.weather .row'),
  };
}
