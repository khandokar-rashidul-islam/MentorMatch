import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/route";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/lib/integration/react";
import BootstrapApp from "./components/auth/BootstrapApp.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}>
            <BootstrapApp />
          </RouterProvider>
          <Toaster />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
