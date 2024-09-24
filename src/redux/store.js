// store.js
import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./reducers/clientReducer"; // Importa el clientReducer desde el archivo correcto
import loanReducer from "./reducers/loanReducer";
const store = configureStore({
  reducer: {
    client: clientReducer, // Asegúrate de registrar el clientReducer
    loansAvilable: loanReducer,
  },
});

export default store;
