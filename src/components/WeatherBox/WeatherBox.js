import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(
    (cityName) => {
      console.log('check');
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
        setPending(true)
      ).then((res) => {
        if (res.status === 200) {
          setError(false);

          return res.json().then((data) => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main,
            };

            setWeatherData(weatherData);
            setPending(false);
          });
        } else {
          setError(true);
        }
      });
    },
    [API_KEY]
  );

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && !pending && <WeatherSummary {...weatherData} />}
      {pending && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
