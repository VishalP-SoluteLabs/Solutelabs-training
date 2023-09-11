import './App.css';
import { useState } from 'react';

const api = {
  key: '36e6b3061766dd5d1128b40b918611bf',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({})

  const searchPressed = () => {
    console.log(`${api.base}weather?q=${search}&appid=${api.key}`)
    fetch(`${api.base}weather?q=${search}&appid=${api.key}`)
     .then(res => res.json())
     .then(result => {
      setWeather(result)
     })
  }

  function calculateCelsius(temp) {
    return Math.floor(temp - 273);
  }

  const temperature = weather.main && weather.main.temp ? Math.floor(weather.main.temp - 273) : '';
  const weatherMain = weather.weather && weather.weather.length > 0 ? weather.weather[0].main : '';
  const weatherDescription = weather.weather && weather.weather.length > 0 ? weather.weather[0].description : '';

  return (
    <div className="App">
    <header className='App-header'>
     <h1>Weather App</h1>
     <div>
         <input type='text' placeholder='Search...' onChange={(e) => setSearch(e.target.value)}/>
         <button onClick={searchPressed}>Search</button>
     </div>

     {weather.sys && weather.name && (
          <div className='place'>
            <p>{weather.name} - </p>
            <p>    {weather.sys.country}</p>
          </div>
        )}
     
     <p>{temperature} °C</p>
     <div>
       <p>{weatherMain}</p>
       <p>({weatherDescription})</p>
     </div>
    </header>
    </div>
  );
}

export default App;
