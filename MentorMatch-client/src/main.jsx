import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/route";
import { ThemeProvider } from "./components/ui/theme-provider";
import RoleProvider from "./context/RoleProvider";
import { Provider } from "react-redux";
import {store} from "./redux/store.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RoleProvider>
        <Provider store={store}  >
          <RouterProvider router={router} />
        </Provider>
      </RoleProvider>
    </ThemeProvider>
  </StrictMode>
);
