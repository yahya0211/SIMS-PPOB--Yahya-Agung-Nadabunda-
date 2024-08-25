import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/index.js";

// Mendapatkan elemen root dari DOM
const rootElement = document.getElementById("root");

// Pastikan elemen root ada sebelum mencoba merender aplikasi
if (rootElement) {
  // Menggunakan createRoot untuk merender aplikasi React
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
