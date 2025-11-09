import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex mb-6 gap-x-2">
      <input
        type="text"
        placeholder="Search for a place..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className=" p-2 rounded-md w-full bg-neutral-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 max-sm:px-4 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
