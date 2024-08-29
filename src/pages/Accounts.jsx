import React, { useEffect, useState } from "react";
import Account from "../components/Account";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import SpamInformativo from "../components/SpamInformativo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Main = () => {
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

  if (!client) {
    return <p>Loading client data...</p>; // Muestra un mensaje mientras se carga el cliente
  }

  return (
    <>
      <SpamInformativo
        title={`🙋‍♀️Welcome ${client.firstName} ${client.lastName}`}
        text1="Here you'll find a clear and comprehensive summary of all your bank accounts. 👇 You can view your account number, available balance, and opening date. It's easy and fast! 💼"
        text2="✨ Want more details? Simply click on any account to explore a detailed breakdown. From here, you can access transactions, statements, and personalized options to manage your money efficiently. 💰"
        text3="Enjoy a hassle-free banking experience, always within your reach! 🚀"
        imgSrc="/public/Finance.png"
      />

      <div className="flex flex-wrap gap-4 my-10 px-80 justify-evenly bg-[#81ccc1bd] m-5 rounded-3xl p-5 shadow-2xl">
        <h2 className="w-full text-center border-b-2 border-[#111827] px-1 pb-4 text-4xl font-medium text-[#111827]">
          Accounts
        </h2>
        {client.accounts.map((acc) => (
          <Link key={acc.id} to={`/account/${acc.id}`}>
            <Account
              account={acc.number}
              balance={acc.balance}
              openingDate={acc.creationDate}
            />
          </Link>
        ))}
      </div>

      <Banner />

      <Carousel />
    </>
  );
};

export default Main;
