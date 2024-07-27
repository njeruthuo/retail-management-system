import axios from "axios";
import { Product } from "../types";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface ProductContextProps {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/",
        product
      );
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id: number, product: Omit<Product, "id">) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/products/${id}/`,
        product
      );
      setProducts(products.map((p) => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}/`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
