import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para cargar el cliente
export const loadClient = createAsyncThunk(
  "loadClient",
  async (_, { rejectWithValue }) => {
const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "https://homebankig.onrender.com/api/auth/current",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Devuelve los datos del cliente directamente
    } catch (error) {
      console.error("Error loading client:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      ); // Devuelve un mensaje de error
    }
  }
);

// Acción para agregar una tarjeta al cliente
export const addCardToClient = createAsyncThunk("addCardToClient", async(card, { rejectWithValue }) => {
const token = localStorage.getItem("token");
console.log(card);

  try {
    const response = await axios.post("https://homebankig.onrender.com/api/clients/current/cards", card,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    return response.data; 
  } catch (error) {
    console.error("Error loading client:", error);
    return rejectWithValue(
      error.response ? error.response.data : "Unknown error"
    ); 
  }

});

export const addAccountToClient = createAsyncThunk("addAccountToClient",async (_, { rejectWithValue }) => {
const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://homebankig.onrender.com/api/clients/current/accounts", token,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error loading client:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      ); // Devuelve un mensaje de error
    }
  }
);

