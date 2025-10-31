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
              {/* {props.countryFound.languages.map((language) => (
                <li key={language}>{language}</li>
              ))} */}
              {Object.values(props.countryFound.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={props.countryFound.flags.png} alt={`Flag of ${props.countryFound.name.common}`} width="200" />
          </div>
        ) : (
          <div>
            {props.matchingElements.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) : (
              props.matchingElements.map((e) => {
                return <div key={e.name.common}>{e.name.common}</div>;
              })
            )}
          </div>
        )}
      </div>
      {/* If countryFound shows object properties values*/}
      {/* If it is not countryFound in App, so display the matching names (state in App as wel), but before check its lenght if it is larger than 10, if so, suggest another filter, otherwise show just the names */}
    </div>
  );
}
