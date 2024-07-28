import React, { useState } from "react";
import { PageSkeleton } from "@/components/ui/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategoryContext } from "@/lib/context/CategoryContext";
import { useCartContext } from "@/lib/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const calculateTotals = (items, quantities) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  items.forEach((item) => {
    const quantity = quantities[item.id] || 1;
    totalQuantity += quantity;
    totalPrice += item.selling_price * quantity;
  });

  return { totalQuantity, totalPrice };
};

const Home = () => {
  const [quantities, setQuantities] = useState({});
  const { cart, removeItem, clearCart } = useCartContext();
  const { categories } = useCategoryContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const addFunction = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const reduceFunction = (id) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 1) - 1;
      if (newQuantity < 1) {
        return { ...prev, [id]: 1 };
      }
      return { ...prev, [id]: newQuantity };
    });
  };

  const { totalQuantity, totalPrice } = calculateTotals(cart.items, quantities);

  const handleCheckout = async () => {
    const order = {
      total_price: totalPrice,
      items: cart.items.map((item) => ({
        product: item.id,
        quantity: quantities[item.id] || 1,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders/",
        order,
        {
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers if required
          },
        }
      );

      toast({
        title: "Order placed",
        description: "Your order has been placed successfully.",
      });
      clearCart();
      navigate("/"); // Redirect to a confirmation page
    } catch (error) {
      toast({
        title: "Order failed",
        description: error.response ? error.response.data : error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      {/* Categories and the main page division */}
      <div className="flex border-t pt-4">
        <PageSkeleton />

        <div className="">
          <h3 className="text-md">Shopping cart</h3>

          {cart.items.length ? (
            <section className="mt-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Price(Kshs)</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => {
                    const { id, name, selling_price } = item;
                    return (
                      <TableRow key={id}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell className="text-right">
                          {selling_price}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-row space-x-4 place-items-center">
                            <Button
                              className="bg-green-600 text-white"
                              onClick={() => addFunction(id)}
                            >
                              +
                            </Button>
                            <p>{quantities[id] || 1}</p>
                            <Button
                              variant={"destructive"}
                              onClick={() => reduceFunction(id)}
                            >
                              -
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={"destructive"}
                            onClick={() => removeItem(id)}
                          >
                            remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  <TableRow>
                    <TableCell className="font-medium">Totals</TableCell>
                    <TableCell className="text-right">
                      Kshs. {totalPrice}
                    </TableCell>
                    <TableCell className="text-right"></TableCell>
                    <TableCell className="text-right">
                      <Button onClick={handleCheckout}>
                        Checkout
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
                            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          ) : (
            <p className="text-sm text-gray-400 mt-4">
              You have no items in your cart. Search for items or browse the
              category list to add some.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
