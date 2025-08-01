import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App.tsx";

import "./i18n.ts";
createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Suspense fallback="Loading...">
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <App />
            </PersistGate>
         </Provider>
      </Suspense>
   </StrictMode>
);
