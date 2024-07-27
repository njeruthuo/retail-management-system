import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { Category } from "../types";

interface CategoryContextProps {
  categories: Category[];
  loading: boolean;
  addCategory: (name: string) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async (name: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/categories/",
        { name }
      );
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const updateCategory = async (id: number, name: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/categories/${id}/`,
        { name }
      );
      setCategories(
        categories.map((category) =>
          category.id === id ? response.data : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}/`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
