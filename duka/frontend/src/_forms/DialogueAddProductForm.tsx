import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProductContext } from "@/lib/context/ProductContext";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  selling_price: z.string().min(1, {
    message: "Selling price is required.",
  }),
  buying_price: z.string().min(1, {
    message: "Buying price is required.",
  }),
});

const DialogueAddProductForm = ({ category_id }) => {
  const { toast } = useToast();
  const { addProduct } = useProductContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      selling_price: "",
      buying_price: "",
    },
  });

  async function onSubmit(values) {
    try {
      const newProduct = await addProduct({
        ...values,
        selling_price: parseFloat(values.selling_price),
        buying_price: parseFloat(values.buying_price),
        category_id: parseInt(category_id),
      });

      toast({
        title: "Success",
        description: `Product added successfully.`,
      });
      form.reset();
      return newProduct;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <div className="icon-holder hover:bg-slate-700">
          <AlertDialog>
            <AlertDialogTrigger className="font-light place-items-center flex">
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
              </svg>
              Add a product to category
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Add a product to this category
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <form
                    id="add-product-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g Rice"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="selling_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selling Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="e.g 10.99"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="buying_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Buying Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="e.g 8.49"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button type="submit" form="add-product-form">
                    Submit
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Form>
    </>
  );
};

export default DialogueAddProductForm;
