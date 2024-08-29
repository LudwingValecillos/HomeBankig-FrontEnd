import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import SpamInformativo from "../components/SpamInformativo";
import PrintCard from "../components/PrintCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage

    if (token) {
      axios
        .get("http://localhost:8080/api/auth/current", {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el header Authorization
          },
        })
        .then((response) => {
          setClient(response.data); // Actualiza el estado con los datos del cliente
        })
        .catch((error) => {
          navigate("/login");
          console.error("Error fetching client data:", error);
        });
    } else {
      console.error("No token found in localStorage");
    }
  }, []);
   
  // Check if client is null before using it
  if (!client) {
    return <p>Loading client data...</p>;
  }
  return (
    <>
      <SpamInformativo
        title="Detailed View of Your Cards"
        text1="Welcome to your personal card space! 🎉 Here you can view all the cards associated with your accounts. 👇"
        text2="✨ You can see the card number, type (credit or debit), color, and expiration date of each one. Manage your finances quickly and securely."
        text3="Explore your options and maintain full control of your cards from one place! 🚀"
        imgSrc="/public/Payment.png"
      />
      <PrintCard client={client} /> 
      <Banner />

      <Carousel />
    </>
  );
};

export default Cards;
