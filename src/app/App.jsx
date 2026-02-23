import { HashRouter } from "react-router-dom";
import { AppRouter } from "@/app/router";
import { QueryClient, onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { get, set, del } from "idb-keyval";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 5,
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  const handleOnline = () => {
    setOnline(true);
    queryClient.resumePausedMutations().then(() => {
      queryClient.invalidateQueries();
    });
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", () => setOnline(false));

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", () => setOnline(false));
  };
});

const persister = createSyncStoragePersister({
  storage: {
    getItem: (key) => get(key),
    setItem: (key, value) => set(key, value),
    removeItem: (key) => del(key),
  },
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // Resume mutations after cache restoration (e.g., after page refresh)
        queryClient.resumePausedMutations();
      }}
    >
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
