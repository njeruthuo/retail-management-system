import "./index.css";
import { HomeLayout } from "./_layout";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AddCategoryForm, AddProductForm } from "./_forms";
import { CategoryDetails, Footer, Home, Navbar } from "./pages";

export default function App() {
  return (
    <section className="relative min-h-screen">
      <main className="flex flex-col w-10/12 mx-auto dark:bg-slate-700">
        <Navbar />
        <hr />
        <Toaster />
        <Routes>
          <Route index element={<Home />} />

          <Route element={<HomeLayout />}>
            {/* <Route path="/add-product" element={<AddProductForm />} /> */}
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/category/:id" element={<CategoryDetails />} />
          </Route>
        </Routes>
      </main>
      <div className="absolute bottom-0 right-0 left-0 text-white">
        <Footer />
      </div>
    </section>
  );
}
