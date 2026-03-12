import "./index.css";
import { render } from "react-dom";
import { App } from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

render(
  <AuthProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </AuthProvider>,
  rootElement
);