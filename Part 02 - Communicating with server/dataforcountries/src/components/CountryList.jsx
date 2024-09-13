const CountryList = ({ countries, onSelectedCountry }) => {
  return (
    <>
      {countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.map((country) => (
            <p key={country.name.common}>
              {country.name.common}
              <button onClick={() => onSelectedCountry(country.name.common)}>
                Show
              </button>
            </p>
          ))}
    </>
  );
};

export default CountryList;
