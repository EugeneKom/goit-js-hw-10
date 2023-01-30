const ENDPOINT = 'https://restcountries.com/v3.1';

export default function fetchCountries(name) {
  return fetch(
    `${ENDPOINT}/name/${name}?fields=name,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export { fetchCountries };
