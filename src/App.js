import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import Header from "./components/Header";

const API_KEY = "e1f72088cc151810c82796d4e9e35dfb";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempUnit, setTempUnit] = useState("metric");
  const [windUnit, setWindUnit] = useState("km/h");
  const [precipUnit, setPrecipUnit] = useState("mm");
  const [selectedDate, setSelectedDate] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city, tempUnit]); // ✅ اصلاح useEffect

  const fetchWeather = async (searchCity) => {
    setCity(searchCity);
    setLoading(true);
    setError("");
    setWeatherData(null);
    setDailyData([]);
    setHourlyData([]);
    setSelectedDate("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=${tempUnit}`
      );
      if (!res.ok) throw new Error("Failed to fetch current weather");
      const data = await res.json();
      setWeatherData(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=${tempUnit}&appid=${API_KEY}`
      );
      if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
      const forecastData = await forecastRes.json();

      setHourlyData(forecastData.list);

      const dailyMap = {};
      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap[date]) dailyMap[date] = [];
        dailyMap[date].push(item);
      });

      const dailyArray = Object.keys(dailyMap).map((date) => {
        const dayItems = dailyMap[date];
        const temps = dayItems.map((i) => i.main.temp);
        const weatherMain = dayItems[0].weather[0].main;
        const weatherDesc = dayItems[0].weather[0].description;
        const icon = dayItems[0].weather[0].icon;

        return {
          date,
          temp: {
            day: temps.reduce((a, b) => a + b, 0) / temps.length,
            min: Math.min(...temps),
            max: Math.max(...temps),
          },
          weather: [
            {
              main: weatherMain,
              description: weatherDesc,
              icon,
            },
          ],
        };
      });

      setDailyData(dailyArray.slice(0, 7));
    } catch (err) {
      console.error(err);
      setError("No internet connection or failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getWindSpeed = (speed) => {
    if (!speed) return 0;
    if (windUnit === "km/h") return (speed * 3.6).toFixed(1);
    if (windUnit === "mph") return (speed * 2.23694).toFixed(1);
    return speed;
  };

  const getPrecipitation = (value) => {
    if (!value) return 0;
    if (precipUnit === "mm") return value.toFixed(1);
    if (precipUnit === "inches") return (value / 25.4).toFixed(2);
    return value;
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="min-h-screen flex flex-col items-center w-full p-4 font-sans">
        <Header
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
          windUnit={windUnit}
          setWindUnit={setWindUnit}
          precipUnit={precipUnit}
          setPrecipUnit={setPrecipUnit}
        />

        <div className="mb-8 font-extrabold text-3xl text-center max-sm:text-xl break-words">
          How is the sky looking today?
        </div>

        <div className="w-full px-1 md:px-20 lg:px-40 xl:px-60 2xl:px-80">
          <SearchBar onSearch={fetchWeather} />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex w-full mt-4 max-md:flex-col gap-4 max-sm:gap-2">
          <div className="w-3/4 max-sm:w-full w-full flex flex-col justify-start h-full">
            {loading ? (
              <div className="animate-pulse h-48 bg-gray-400 rounded mb-4 w-full"></div>
            ) : (
              weatherData && (
                <WeatherCard
                  data={weatherData}
                  getWindSpeed={getWindSpeed}
                  windUnit={windUnit}
                  getPrecipitation={getPrecipitation}
                  precipUnit={precipUnit}
                  tempUnit={tempUnit}
                />
              )
            )}

            {loading ? (
              <div className="animate-pulse bg-gray-200 rounded mb-2"></div>
            ) : (
              dailyData.length > 0 && (
                <DailyForecast daily={dailyData} tempUnit={tempUnit} />
              )
            )}
          </div>

          <div className="w-1/4 max-sm:w-full max-md:w-full flex flex-col">
            {loading ? (
              <div className="animate-pulse h-full bg-gray-200 rounded"></div>
            ) : (
              hourlyData.length > 0 && (
                <div className="h-full">
                  <HourlyForecast
                    hourly={hourlyData}
                    tempUnit={tempUnit}
                    dailyData={dailyData}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
