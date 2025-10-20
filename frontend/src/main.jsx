import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MemosProvider } from "./context/MemosProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MemosProvider>
          <App />
        </MemosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
