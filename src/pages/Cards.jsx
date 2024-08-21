import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import SpamInformativo from "../components/SpamInformativo";
import PrintCard from "../components/PrintCard";
import axios from "axios";

const Cards = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clients/")
      .then((response) => {
        setClient(response.data.find((client) => client.id === 2));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
