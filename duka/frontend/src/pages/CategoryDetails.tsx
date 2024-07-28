import React, { useState } from "react";
import { useCategoryContext } from "@/lib/context/CategoryContext";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { DialogueAddProductForm } from "@/_forms";
import { useProductContext } from "@/lib/context/ProductContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCartContext } from "@/lib/context/CartContext";

const CategoryDetails = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const { categories, deleteCategory } = useCategoryContext();
  const { cart, addItem, removeItem, clearCart } = useCartContext();
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

  const handleAddToCart = (product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">{category.name}</h2>

      <div className="flex space-x-6">
        <DialogueAddProductForm category_id={id} />

        <AlertDialog>
          <AlertDialogTrigger>
            <button className="icon-holder text-white bg-red-500 hover:bg-red-700">
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
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete category</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteNotify(id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="">
        {/* Product list */}
        <ul className="mt-4">
          {filteredProducts.map((product) => {
            const { id, name } = product;
            return (
              <li
                className="my-2 hover:bg-slate-400 hover:cursor-pointer hover:text-white ring-1 w-60 px-2 py-1 rounded"
                key={id}
              >
                <div
                  onClick={() => handleAddToCart(product)}
                  className="flex place-items-center justify-between"
                >
                  {name}
                  <div className="hover:bg-slate-700 p-1 rounded">
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
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDetails;
