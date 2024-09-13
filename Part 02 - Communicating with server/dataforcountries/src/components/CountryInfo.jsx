import kelvinToCelsius from '../utils/kelvinToCelsius';

const LanguageList = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(([code, name]) => (
        <li key={code}>{name}</li>
      ))}
    </ul>
  );
};

const CapitalWeather = ({ weatherData }) => {
  return (
    <>
      <h2>Weather in {weatherData?.name}</h2>
      <p>Temperature: {kelvinToCelsius(weatherData?.main?.temp)}º Celsius</p>
      <p>Humidity: {weatherData?.main?.humidity}%</p>
      <p>Pressure: {weatherData?.main?.pressure} hPa</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`}
        alt={weatherData?.weather?.[0].description}
      />
      <p>{weatherData?.weather?.[0].description}</p>
      <p>
        Wind: {weatherData?.wind?.speed} m/s at {weatherData?.wind?.deg} degrees
      </p>
    </>
  );
};

const CountryInfo = ({ country, weather }) => {
  const {
    name: { common: countryName },
    capital,
    languages,
    area,
    flags: { png: flagImageUrl },
  } = country;

  return (
    <>
      <h1>{countryName}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages:</h2>
      <LanguageList languages={languages} />
      <img src={flagImageUrl} alt={`${countryName}'s flag`} />
      <CapitalWeather weatherData={weather} />
    </>
  );
};

export default CountryInfo;
