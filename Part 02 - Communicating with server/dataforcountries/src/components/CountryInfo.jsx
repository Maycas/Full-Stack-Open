const LanguageList = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(([code, name]) => (
        <li key={code}>{name}</li>
      ))}
    </ul>
  );
};

const CountryInfo = ({ country }) => {
  const countryName = country.name.common;

  return (
    <>
      <h1>{countryName}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <LanguageList languages={country.languages} />
      <img src={country.flags.png} alt={`${countryName}'s flag`} />
    </>
  );
};

export default CountryInfo;
