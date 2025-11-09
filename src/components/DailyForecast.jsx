export default function DailyForecast({ daily, tempUnit, selectedDate }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!daily || daily.length === 0) return null;

  const convertTemp = (temp) => {
    return tempUnit === "imperial" ? temp * 9/5 + 32 : temp;
  };

  return (
    <div className="mt-6 grid grid-cols-3 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-5 w-full p-3 max-sm:p-0 max-sm:gap-2  ">
      {daily.map((day, index) => {
        const dateObj = new Date(day.date);
        const dayName = daysOfWeek[dateObj.getDay()];
        const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const isSelected = selectedDate === day.date;

        return (
          <div
            key={index}
          
            className={`cursor-pointer p-4 max-sm:p-1 max-sm:rounded-sm text-center rounded-2xl shadow-lg transform transition-transform duration-300 ${
              isSelected ? "bg-blue-300/80 scale-105" : "bg-gray-700 bg-opacity-70 backdrop-blur-md hover:scale-105"
            }`}
          >
            <h3 className="font-bold text-lg max-sm:text-xs">{dayName}</h3>
            <img src={iconUrl} alt={day.weather[0].description} className="mx-auto" />
           
            
            <div className="flex justify-between items-center gap-x-5 max-sm:gap-x-2 max-sm:text-xs">
              <p>{convertTemp(day.temp.min).toFixed(1)}°</p>
            <p>{convertTemp(day.temp.max).toFixed(1)}°</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
