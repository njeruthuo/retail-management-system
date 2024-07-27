import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

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
import { useCategoryContext } from "@/lib/context/CategoryContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name is too short",
  }),
});

const AddCategoryForm = () => {
  const { toast } = useToast();
  const { addCategory } = useCategoryContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newCategory = await addCategory(values.name);
      toast({
        title: "Success",
        description: `Category added successfully.`,
      });
      form.reset(); // Optionally reset the form after successful submission
      return newCategory;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div className="my-4">
        <h3 className="font-light mb-3">
          Add a category of goods to your shop.
        </h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Cereals" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default AddCategoryForm;
