export default function HourlyForecast({ hourly, tempUnit, dailyData, selectedDate, setSelectedDate }) {
  if (!hourly || hourly.length === 0) {
    return (
      <div className="flex flex-col  ml-4 flex-1 ">
        <div className="animate-pulse h-48  rounded"></div>
      </div>
    );
  }
 
  const filteredHourly = selectedDate
    ? hourly.filter((hour) => hour.dt_txt.startsWith(selectedDate))
    : hourly.slice(0, 8);

  const getWeekDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="flex flex-col w-full  h-full ">
      
      <div className=" bg-gray-800 w-full h-full text-center rounded float-end  px-3">
        {/* Day Selector داخل جدول */}
        <div className="p-3  flex justify-end  text-right text-sm">
          <select
            className="outline-none bg-neutral-800 rounded px-5 py-1 text-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {dailyData.map((day) => (
              <option key={day.date} value={day.date}>
                {getWeekDay(day.date)}
              </option>
            ))}
          </select>
        </div>
        <div>
          {filteredHourly.map((hour) => {
            const time = new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit' });
            return (
              <ul key={hour.dt} className=" rounded-sm bg-gray-700 mb-3  hover:bg-neutral-500 flex justify-between items-center gap-x-4 gap-y-5  ">
                 <li className="py-2 px-2">
                  <img
                    src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt={hour.weather[0].description}
                    className="w-10 h-10 mx-auto"
                  />
                </li>
                <li className="py-2 px-2">{time}</li>
               
                <li className="py-2 px-2">{Math.round(hour.main.temp)}°{tempUnit === 'metric' ? 'C' : 'F'}</li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
