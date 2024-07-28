import React from "react";
import { Outlet } from "react-router-dom";

import { useCategoryContext } from "@/lib/context/CategoryContext";
import { PageSkeleton } from "@/components/ui/shared";

const HomeLayout = () => {
  const { categories } = useCategoryContext();

  return (
    <section>
      {/* Categories and the main page division */}
      <div className="flex border-t pt-4">
        {/* Your other content goes here */}

        <PageSkeleton />
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
