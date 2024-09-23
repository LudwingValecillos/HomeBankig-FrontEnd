import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Account from "../components/Account";
import Table from "../components/Table";
import SpamInformativo from "../components/SpamInformativo";
import Banner from "../components/Banner";
import Buttom from "../components/Buttom";

import { loadClient } from "../redux/actions/clientAction";
import accountDetails from "../assets/accountDetails.png";

const AccountDetails = () => {
  const { id } = useParams(); // Obtener el id desde los parámetros de la URL
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client.client);

    window.scrollTo(0, 10);

    if (client.firstName === "") {
      dispatch(loadClient())
        .unwrap()
        .catch((error) => console.log(error));
    }

  const account = client.accounts?.find(
    (account) => account.id === parseInt(id, 10)
  );

  if (!account) {
    return <p>Account not found.</p>;
  }

  // Simplificar transacciones para la tabla
  const simplifiedAccount = account.transactions.map((tr) => ({
    type: tr.type,
    amount: tr.amount,
    date: tr.date.slice(0, 10),
    hora: tr.date.slice(11, 19),
    description: tr.description,
  }));

  return (
    <>
      {/* Spam Informativo */}
      <SpamInformativo
        title={"Detailed View of Your Account 💰" + `\n`}
        text1="🌟 Welcome to the detailed view of your account! Here you can elegantly and clearly explore all the information about your selected account. 🏦"
        text2="💼 Enjoy a comprehensive breakdown of your transactions and balances. Every detail has been organized so you can manage your finances with the sophistication you deserve."
        text3="✨ Navigate with confidence and discover all the options available to you, designed to offer you an unparalleled banking experience! 🚀"
        imgSrc={accountDetails}
      />

      {/* Detalles de la cuenta */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-10 lg:p-10 bg-[#A2D9D1] m-5 rounded-3xl shadow">
        <div className="p-2 lg:w-1/2 lg:px-40 AccountDetails">
          <Account
            account={account.number}
            balance={account.balance}
            openingDate={account.creationDate}
          />
        </div>

        {/* Mostrar tabla de transacciones o mensaje de que no hay transacciones */}
        {account.transactions.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center bg-[#dad8f8d8] p-10 rounded-3xl">
            <p className="text-2xl">No transactions available.</p>
            <Link to="/transactions">
              <Buttom title="Make a transfer" isActive={false} />
            </Link>
          </div>
        ) : (
          <div className="w-full p-2 lg:w-1/2 Transactions">
            <Table
              title="Transactions"
              ths={["Type", "Amount", "Date", "Hour", "Description"]}
              tds={simplifiedAccount}
            />
          </div>
        )}
      </div>

      {/* Banner al final de la vista */}
      <Banner />
    </>
  );
};

export default AccountDetails;
