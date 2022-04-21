import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name){
    const URL = 'https://restcountries.com/v3.1/name/';
    const options = `?fields=name,capital,population,flags,languages`;
  
    return fetch(`${URL}${name}${options}`).then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    });
}