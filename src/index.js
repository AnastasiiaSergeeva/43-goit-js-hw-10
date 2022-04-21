import './css/styles.css';
import {fetchCountries}   from './js/FetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(){
    const filled = inputRef.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (filled) {
        fetchCountries(filled)
        .then(renderInterface)
        .catch(error => {
         /*  Notify.failure('Oops, there is no country with that name'); */
          console.log(error);
        });
    }
    function renderInterface(data) {
        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
         return;
        }
       renderCountryList(data);
        }

        function renderCountryList(data) {
            const markup = data
              .map(({ flags: { svg }, name: { official } }) => {
                return `<li><img src="${svg}" alt="${official}" width="100" height="50"/>${official}</li>`;
              })
              .join('');

          if (data.length === 1) {
            const languages = Object.values(data[0].languages).join(', ');
            const markupInfo = 
        `<ul>
            <li>Capital: ${data[0].capital}</li>
            <li>Population: ${data[0].population}</li>
            <li>Languages: ${languages}</li>
        </ul>`;
      
            countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
          }
          return countryList.insertAdjacentHTML('afterbegin', markup);
        }
    }

    