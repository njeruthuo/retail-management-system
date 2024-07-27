import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Callback function to handle search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm); // Trigger the search callback
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search category or product..."
        className="border rounded-lg p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
