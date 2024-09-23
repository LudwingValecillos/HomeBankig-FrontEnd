import { createReducer } from "@reduxjs/toolkit";
import { addAccountToClient, addCardToClient, loadClient } from "../actions/clientAction";

const initialState = {
  client: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    accounts: [
      {
        id: 0,
        number: 0,
        balance: 0,
        creationDate: "",
        transactions: [
          {
            id: 0,
            type: "",
            amount: 0,
            description: "",
            date: "",
          },
        ],
      },
    ],
    loans: [
      {
        id: 0,
        loanId: 0,
        name: "",
        amount: 0,
        payments: 0,
      },
    ],
    cards: [
      {
        id: 0,
        cvv: 0,
        number: 0,
        fromDate: "",
        thruDate: "",
        type: "",
        color: "",
        clientHolder: "",
      },
    ],
  },
  status: "idle",
  error: null,
};

const clientReducer = createReducer(initialState, (builder) => {
  builder
    // Manejo de loadClient
    .addCase(loadClient.fulfilled, (state, action) => {
      state.client = action.payload;
      state.status = "success";
    })
    .addCase(loadClient.pending, (state) => {
      state.status = "loading";
    })
    .addCase(loadClient.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })

    // Manejo de addAccountToClient
    .addCase(addAccountToClient.fulfilled, (state, action) => {
      state.client.accounts.push(action.payload);
    })

    // Manejo de addCardToClient (solo una vez)
    .addCase(addCardToClient.fulfilled, (state, action) => {
      state.client.cards.push(action.payload);
      state.status = "success";
    })
    .addCase(addCardToClient.pending, (state) => {
      state.status = "loading";
    })
    .addCase(addCardToClient.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
});

export default clientReducer;

