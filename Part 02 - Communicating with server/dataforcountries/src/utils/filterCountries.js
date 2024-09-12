const filterCountries = (countries, searchQuery) => {
  const exactMatch = countries.find(
    (country) => country.name.common.toLowerCase() === searchQuery.toLowerCase()
  );

  const filteredCountryList = exactMatch
    ? [exactMatch]
    : countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return filteredCountryList;
};

export default filterCountries;
