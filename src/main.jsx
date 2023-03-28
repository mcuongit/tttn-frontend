import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store, { persistor } from "./app/store";
import "./index.css";
import "./i18n";
import "flowbite/dist/flowbite.min.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </React.StrictMode>
);
