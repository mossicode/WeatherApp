import { useState } from "react";
import logo from "../images/logo.svg"
import DropdownIcons from "../assets/icons/DropdownIcons";
import CheckMarkIcon from "../assets/icons/CheckMarkIcon";

export default function Header({
  tempUnit,
  setTempUnit,
  windUnit,
  setWindUnit,
  precipUnit,
  setPrecipUnit
}) {
  const [open, setOpen] = useState(false);

  const tempOptions = [
    { label: "Cilsius (S)", value: "metric" },
    { label: "Fahrenheit (F)", value: "imperial" },
  ];

  const windOptions = [
    { label: "km/h", value: "km/h" },
    { label: "mph", value: "mph" },
  ];

  const precipOptions = [
    { label: "mm", value: "mm" },
    { label: "inches", value: "inches" },
  ];

  return (
    <div className="w-full flex justify-between items-center p-4 max-sm:p-2  relative">

      <div className="flex max-sm:w-24">
        <img src={logo} alt="nothing" />
      
      </div>

      <div className="relative">
      <div className="flex">
          <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-neutral-700 bg-neutral-700 px-2 max-sm:text-xs flex items-center gap-x-3 max-sm:gap-x-1 transition"
        >
          
             Setting
             <DropdownIcons />
        </button>

      </div>
      
        {open && (
          <div className="absolute right-0 mt-2 w-48  border rounded shadow-lg z-50 p-2 space-y-3 bg-gray-800 text-white">
   
            <div>
              <div className="text-sm font-medium mb-1">Temperature</div>
              <div className="flex flex-col">
                {tempOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setTempUnit(opt.value);
                      setOpen(false);
                    }}
                    className={`py-2 px-3 mb-1 text-left flex justify-between items-center  hover:bg-gray-700 ${
                      tempUnit === opt.value ? "bg-gray-600 rounded-md text-white" : ""
                    }`}
                  >
                    {opt.label} {tempUnit === opt.value && <CheckMarkIcon />}
                  </button>
                ))}
              </div>
            </div>

       
            <div>
              <div className="text-sm font-medium mb-1">Wind</div>
              <div className="flex flex-col">
                {windOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setWindUnit(opt.value);
                      setOpen(false); 
                    }}
                    className={`py-2 px-2 rounded mb-1 text-left flex justify-between items-center hover:bg-neutral-700 ${
                      windUnit === opt.value ? "bg-gray-600 rounded-md text-white" : ""
                    }`}
                  >
                    {opt.label} {windUnit === opt.value && <CheckMarkIcon />}
                  </button>
                ))}
              </div>
            </div>

    
            <div>
              <div className="text-sm font-medium mb-1">Precipitation</div>
              <div className="flex flex-col">
                {precipOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setPrecipUnit(opt.value);
                      setOpen(false); 
                    }}
                    className={`py-2 px-3 rounded mb-1 text-left flex justify-between items-center  hover:bg-neutral-700
                       ${
                      precipUnit === opt.value ? "bg-gray-600 rounded-md text-white" : ""
                    }
                    }`}
                  >
                    {opt.label} {precipUnit === opt.value && <CheckMarkIcon />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
