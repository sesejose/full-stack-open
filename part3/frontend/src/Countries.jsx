export default function Countries(props) {
  // Display country

  return (
    <div>
      <h2>Countries</h2>
      <div>
        <form>
          <label>Find countries:</label>
          <input onChange={props.findCountry} />
        </form>
        {props.countryFound ? (
          <div>
            <h2>{props.countryFound.name.common}</h2>
            <p>Capital: {props.countryFound.capital}</p>
            <p>Area: {props.countryFound.area}</p>
            <h3>Languages:</h3>
            <ul>
              {/* Object.values(object) method */}
              {Object.values(props.countryFound.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={props.countryFound.flags.png} alt={`Flag of ${props.countryFound.name.common}`} width="200" />
            {/* Weather Info */}
            <div>
              <h2>Weather in {props.countryFound.capital}</h2>
              <p>Temperature: {props.weatherInfo.current.temp_c} °C</p>
              <img src={props.weatherInfo.current.condition.icon} alt={props.weatherInfo.current.condition.text} />
              <p>Wind: {props.weatherInfo.current.wind_kph} kph</p>
            </div>
          </div>
        ) : (
          <div>
            {props.matchingElements.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) : (
              props.matchingElements.map((e) => {
                // the showCountry function in App.jsx uses the name property of the country object
                return (
                  <div key={e.name.common}>
                    {e.name.common}
                    <button onClick={() => props.showCountry(e.name.common)}>show</button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {/* If countryFound --> shows object properties values*/}
      {/* If it is not  --> so display the matching names (state in App ), but before check its lenght if it is larger than 10, if so, suggest another filter, otherwise show just the names */}
    </div>
  );
}
