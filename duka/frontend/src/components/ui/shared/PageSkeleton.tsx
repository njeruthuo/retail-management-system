import { useCategoryContext } from "@/lib/context/CategoryContext";
import SearchBar from "@/pages/SearchBar";
import React from "react";

const PageSkeleton = () => {
    const { categories } = useCategoryContext();
    const handleSearch = (searchTerm: string) => {
      console.log("Searching for:", searchTerm);
      // Add your search logic here
    };
  return (
    <>
      <div className="my-4 mx-auto w-1/2">
        <SearchBar onSearch={handleSearch} />
      </div>
    </>
  );
};

export default PageSkeleton;
