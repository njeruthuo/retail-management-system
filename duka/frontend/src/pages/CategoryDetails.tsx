import React, { useState } from "react";
import { useCategoryContext } from "@/lib/context/CategoryContext";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AddProductForm } from "@/_forms";
import { useProductContext } from "@/lib/context/ProductContext";

const CategoryDetails = () => {
  const { toast } = useToast();
  const { deleteCategory } = useCategoryContext();
  const [toggleForm, setToggleForm] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { categories } = useCategoryContext();
  const category = categories.find((category) => category.id === parseInt(id));

  const { products } = useProductContext();

  if (!category) {
    return <div>Category not found</div>;
  }

  const filterProductsByCategory = (categoryId) => {
    return products.filter((product) => product.category.id === categoryId);
  };

  const filteredProducts = filterProductsByCategory(parseInt(id));

  function deleteNotify(id) {
    deleteCategory(id);
    toast({
      title: "Deleted successfully!",
      variant: "destructive",
    });
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">{category.name}</h2>

      <div className="flex space-x-6">
        <button
          onClick={() => setToggleForm((prev) => !prev)}
          className="icon-holder hover:bg-slate-700"
        >
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
          Add a product to this category
        </button>

        <button
          onClick={() => deleteNotify(id)}
          className="icon-holder text-white bg-red-500 hover:bg-red-700"
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete this category
        </button>
      </div>

      {toggleForm ? (
        <div>
          {/* Add product hidden form */}
          <AddProductForm category_id={id} />
        </div>
      ) : (
        <div>
          {/* Product list */}
          <ul>
            {filteredProducts.map((product) => {
              const { id, name } = product;
              return <li key={id}>{name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
