import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import App from "./App";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/lib/integration/react";
// import { store, persistor } from "./redux/Store";

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>,
//   document.getElementById("root")
// );
