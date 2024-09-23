import { createReducer } from "@reduxjs/toolkit";
import { clearLoans, loadLoans } from "../actions/loanAction";

const initialState = {
  
  loansAvilable: [
    {
      id: 0,
      loanId: 0,
      name: "",
      amount: 0,
      payments: 0,
    },
  ],
  status: "idle",
  error: null,
};

const loanReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(loadLoans.fulfilled, (state, action) => {
      return{
        ...state,
        loansAvilable: action.payload,
        status: "success"
      }
    })
    .addCase(loadLoans.pending, (state) => {
      state.status = "loading";
    })
    .addCase(loadLoans.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(clearLoans , (state,action) => {
      state.status = "idle"
    })
})

export default loanReducer