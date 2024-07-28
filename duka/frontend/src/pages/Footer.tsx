import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <section className="bg-slate-700 py-2 flex items-center text-xs">
      <div className="w-5/6 mx-auto justify-around text-center space-y-1">
        <p className="font-light hover:cursor-pointer hover:text-emerald-500">
          Njeru Thuo Software Inc.
        </p>
        <p className="font-light">Copyright&copy; {year} . All rights reserved</p>
      </div>
    </section>
  );
};

export default Footer;
