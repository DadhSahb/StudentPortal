import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import redux from "./components/Redux/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App";

let persistor = persistStore(redux);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={redux}>
        <PersistGate persistor={persistor}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
