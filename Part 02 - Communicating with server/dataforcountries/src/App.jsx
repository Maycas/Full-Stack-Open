import { useState, useEffect } from 'react';

import CountriesService from './services/countries';
import WeatherService from './services/weather';

import FilterInput from './components/FilterInput';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';
import filterCountries from './utils/filterCountries';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityWeather, setCityWeather] = useState({});

  const filteredCountryList = filterCountries(countries, searchQuery);

  useEffect(() => {
    CountriesService.getAll().then((countryList) => setCountries(countryList));
  }, []);

  useEffect(() => {
    if (filteredCountryList.length === 1) {
      setSelectedCountry(filteredCountryList[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountryList]);

  useEffect(() => {
    if (selectedCountry) {
      WeatherService.getWeatherData(selectedCountry.capital).then(
        (weatherData) => setCityWeather(weatherData)
      );
    }
  }, [selectedCountry]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSelectCountry = (countryName) => {
    setSearchQuery(countryName);
  };

  return (
    <>
      <FilterInput onSearch={handleSearchChange} value={searchQuery} />
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} weather={cityWeather} />
      ) : (
        <CountryList
          countries={filteredCountryList}
          onSelectedCountry={handleSelectCountry}
        />
      )}
    </>
  );
}

export default App;
