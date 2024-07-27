import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

const AddProductForm = ({ category_id }) => {
  const { toast } = useToast();
  const { addProduct } = useProductContext();

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      selling_price: "",
      buying_price: "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Convert string values to numbers
      const newProduct = await addProduct({
        name: values.name,
        selling_price: parseFloat(values.selling_price),
        buying_price: parseFloat(values.buying_price),
        category: category_id,
      });

      toast({
        title: "Success",
        description: `Product added successfully.`,
      });
      form.reset(); // Optionally reset the form after successful submission
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
    <Form {...form}>
      <div className="my-4">
        <h3 className="font-light mb-3">Add a product to your shop</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Rice" type="text" {...field} />
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

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
};

export default AddProductForm;
