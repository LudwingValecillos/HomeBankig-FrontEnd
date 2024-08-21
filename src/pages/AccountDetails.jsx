import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Account from "../components/Account";
import Table from "../components/Table";
import SpamInformativo from "../components/SpamInformativo";
import Banner from "../components/Banner";
import axios from "axios";

const AccountDetails = () => {
  const { id } = useParams(); // Get the id from the URL parameters

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

  // Find the account by id
  const acc = client.accounts.find(
    (account) => account.id === parseInt(id, 10)
  );

  if (!acc) {
    return <p>Account not found.</p>;
  }

  // Get simplified transactions
  console.log(acc.transactions);

  const simplifiedAccount = acc.transactions.map((tr) => ({
    type: tr.type,
    amount: tr.amount,
    date: tr.date.slice(0, 10),
    hora: tr.date.slice(11, 19),
    description: tr.description,
  }));

  return (
    <>
      <SpamInformativo
        title={"Detailed View of Your Account 💰" + `\n`}
        text1="🌟 Welcome to the detailed view of your account! Here you can elegantly and clearly explore all the information about your selected account. 🏦"
        text2="💼 Enjoy a comprehensive breakdown of your transactions and balances. Every detail has been organized so you can manage your finances with the sophistication you deserve."
        text3="✨ Navigate with confidence and discover all the options available to you, designed to offer you an unparalleled banking experience! 🚀"
        imgSrc="/public/accountDetails.png"
      />
      <div className="flex items-center justify-center gap-10 p-10">
        <div className="w-1/2 px-40 AccountDetails">
          <Account
            account={acc.number}
            balance={acc.balance}
            openingDate={acc.creationDate}
          />
        </div>
        {acc.transactions.length === 0 ? (
          <p>No transactions available.</p>
        ) : (
          <div className="w-1/2 Transactions">
            <Table
              title="Transactions"
              ths={["Type", "Amount", "Date","Hour", "Description"]}
              tds={simplifiedAccount}
            />
          </div>
        )}
      </div>
      <Banner />
    </>
  );
};

export default AccountDetails;
