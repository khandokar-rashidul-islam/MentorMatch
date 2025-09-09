import { persistor } from "../redux/store";

export const clearPersistedAuth = async () => {
  persistor.pause();
  await persistor.purge();
  persistor.persist();
};
