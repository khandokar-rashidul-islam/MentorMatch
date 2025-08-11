import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/route";
import { ThemeProvider } from "./components/ui/theme-provider";
import RoleProvider from "./context/RoleProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RoleProvider>
        <RouterProvider router={router} />
      </RoleProvider>
    </ThemeProvider>
  </StrictMode>
);
