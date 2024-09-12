import { useState, useEffect } from 'react';

import CountriesService from './services/countries';
import FilterInput from './components/FilterInput';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    CountriesService.getAll().then((countryList) => setCountries(countryList));
  }, []);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const exactMatch = countries.find(
    (country) => country.name.common.toLowerCase() === searchQuery.toLowerCase()
  );

  const filteredCountryList = exactMatch
    ? [exactMatch]
    : countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <FilterInput onSearch={handleSearchChange} />
      {filteredCountryList.length === 1 ? (
        <CountryInfo country={filteredCountryList[0]} />
      ) : (
        <CountryList countries={filteredCountryList} />
      )}
    </>
  );
}

export default App;
