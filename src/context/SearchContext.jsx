import { useState } from "react";
import { SearchContext } from "../hook/useAuth";
import { searchMusic } from "../services/deezerApi";

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    setIsLoading(true);
    setHasSearched(true);
    const results = await searchMusic(searchTerm);
    setSearchResults(results);
    setIsLoading(false);
  };

  const value = {
    searchResults,
    isLoading,
    hasSearched,
    handleSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
