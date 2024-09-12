const CountryList = ({ countries }) => {
  return (
    <>
      {countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
    </>
  );
};

export default CountryList;
