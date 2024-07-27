import React from "react";
import SearchBar from "./SearchBar";
import { useCategoryContext } from "@/lib/context/CategoryContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here
  };
  return (
    <section className="h-16 flex justify-between items-center">
      <h1 className="font-bold md:text-2xl text-lg text-slate-600">
        <Link to={"/"}>My sales</Link>
      </h1>
      <SearchBar />
    </section>
  );
};

export default Navbar;
