import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CategoryProvider, ProductProvider } from "./lib/context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CategoryProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CategoryProvider>
  </BrowserRouter>
);
