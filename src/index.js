import './css/styles.css';
import { fetchCountries } from './script/fetchCountries';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.getElementById('search-box'),
  listEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const valueInput = {
  searchName: '',
};

refs.searchInput.addEventListener(
  'input',
  debounce(takeInputValue, DEBOUNCE_DELAY)
);

function takeInputValue(e) {
  valueInput.searchName = e.target.value;

  fetchCountries(valueInput.searchName.trim())
    .then(reviceMarcup)
    .then(createInfoList)
    .catch(() => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
      createInfoList();
      creatCountryInfo();
    });
}

function reviceMarcup(data) {
  if (data.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (data.length > 1) {
    creatCountryInfo();
  }

  if (data.length === 1) {
    creatCountryInfo(
      data.reduce(
        (marcup, country) => creatMarcupForSingleCountry(country) + marcup,
        ''
      )
    );
  }

  return data.reduce((marcup, country) => creatMarcup(country) + marcup, '');
}

function creatMarcup({ name, flags }) {
  return `<li class="country-item">
    <img class="country_image" src="${flags.svg}" alt="${name.official}">
    <h2 class="country-title">${name.official}</h2>
    </li>`;
}

function creatMarcupForSingleCountry({ capital, population, languages }) {
  return `<p><span class="text-info">Capital:</span>${capital}</p>
  <p><span class="text-info">Population:</span>${population}</p>
  <p><span class="text-info">Languagues:</span>${Object.values(languages)}</p>`;
}

function createInfoList(marcup) {
  refs.listEl.innerHTML = marcup ?? '';
}

function creatCountryInfo(marcup) {
  refs.countryInfoEl.innerHTML = marcup ?? '';
}
