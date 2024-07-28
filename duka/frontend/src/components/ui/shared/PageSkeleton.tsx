import { useCategoryContext } from '@/lib/context/CategoryContext';
import React from 'react'
import { Link } from 'react-router-dom';

const PageSkeleton = () => {
  const { categories } = useCategoryContext();
  return (
    <div className="w-1/4 pl-4 border-r mr-4">
      <h3 className="font-bold text-lg">Categories</h3>
      <Link to={"/add-category"}>
        <p className="text-sm my-2 flex justify-around place-items-center ring-1 w-32 p-1 rounded hover:bg-slate-700 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>{" "}
          Add category
        </p>
      </Link>

      <ul>
        {categories.map((category) => {
          const { id, name } = category;
          return (
            <li className="hover:cursor-pointer my-2 text-sm" key={id}>
              <Link to={`/category/${id}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PageSkeleton