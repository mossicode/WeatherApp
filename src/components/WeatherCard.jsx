export default function WeatherCard({
  data,
  getWindSpeed,
  windUnit,
  getPrecipitation,
  precipUnit,
  tempUnit, // اضافه شد
}) {
  const { name, main, weather, wind, sys, dt } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  // map کد کشور به نام کامل
  const countryNames = {
    AF: "Afghanistan",
    US: "United States",
    IN: "India",
    GB: "United Kingdom",
    // سایر کشورها را می‌توانید اضافه کنید
  };

  const date = new Date(dt * 1000);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const precipitation = data.rain?.["1h"] ?? data.snow?.["1h"] ?? 0;


  const convertTemp = (temp) => {
    if (tempUnit === "imperial") return temp * 9 / 5 + 32;
    return temp;
  };

  return (
    <>

      <div
        className="backdrop-blur-md w-full flex justify-between items-center rounded-2xl shadow-lg p-6 max-sm:pe-8 bg-no-repeat bg-cover bg-center text-center mb-6"
        style={{ backgroundImage: "url('/images/bg-today-large.svg')" }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-2 max-sm:text-xs">
            {name} {countryNames[sys.country] || ""}
          </h2>
          <p className="text-sm max-sm:text-xs text-gray-700 mb-2">{formattedDate}</p>
        </div>

        <div className="flex justify-center items-center gap-x-0">
          <img src={iconUrl} alt={weather[0].description} className="mx-auto max-sm:w-24" />
          <p className="text-6xl font-extrabold max-sm:text-2xl">{Math.round(convertTemp(main.temp))}°</p>
        </div>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center p-2">
        <div className="rounded-md p-4 bg-gray-700 bg-opacity-70 backdrop-blur-md shadow-md flex flex-col justify-center items-center w-full">
          <h3>Feels Like</h3>
          <p>{Math.round(convertTemp(main.feels_like))}°</p>
        </div>
        <div className="rounded-md p-4 bg-gray-700 bg-opacity-70 backdrop-blur-md shadow-md flex flex-col justify-center items-center w-full">
          <h3>Humidity</h3>
          <p>{main.humidity}%</p>
        </div>
        <div className="rounded-md p-4 bg-gray-700 bg-opacity-70 backdrop-blur-md shadow-md flex flex-col justify-center items-center w-full">
          <h3>Wind</h3>
          <p>{getWindSpeed(wind.speed)} {windUnit}</p>
        </div>
        <div className="rounded-md p-4 bg-gray-700 bg-opacity-70 backdrop-blur-md shadow-md flex flex-col justify-center items-center w-full">
          <h3>Precipitation</h3>
          <p>{getPrecipitation(precipitation)} {precipUnit}</p>
        </div>
      </div>
    </>
  );
}
