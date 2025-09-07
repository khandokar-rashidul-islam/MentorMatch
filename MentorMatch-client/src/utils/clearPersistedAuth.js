
import storage from "redux-persist/lib/storage";
import { persistor } from "../redux/store";

export const clearPersistedAuth = async () => {
  persistor.pause();
  await storage.removeItem("persist:auth"); // delete key
  persistor.flush();
};
