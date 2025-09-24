import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Upload from "./Upload.jsx";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {path === "/upload" ? <Upload /> : <App />}
  </React.StrictMode>
);
