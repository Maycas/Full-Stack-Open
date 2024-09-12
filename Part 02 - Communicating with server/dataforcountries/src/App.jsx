import { useState, useEffect } from 'react';

import CountriesService from './services/countries';
import FilterInput from './components/FilterInput';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';
import filterCountries from './utils/filterCountries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    CountriesService.getAll().then((countryList) => setCountries(countryList));
  }, []);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSelectCountry = (countryName) => {
    setSearchQuery(countryName);
  };

  const filteredCountryList = filterCountries(countries, searchQuery);

  return (
    <>
      <FilterInput onSearch={handleSearchChange} />
      {filteredCountryList.length === 1 ? (
        <CountryInfo country={filteredCountryList[0]} />
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
