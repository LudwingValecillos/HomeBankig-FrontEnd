import React, { useEffect } from "react";
import InformativeSpam from "../components/SpamInformativo";
import axios from "axios";
import Table from "../components/Table";
import LabelInput from "../components/LabelInput";
import InputSelect from "../components/InputSelect";
import { useState } from "react";
import Radio from "../components/inputs/Radio";

const Loans = () => {
  const [transactionType, setTransactionType] = useState("");
  const [accountOrigin, setAccountOrigin] = useState("");
  const [amount, setAmount] = useState("");
  const [client, setClient] = useState(null);
  const [payments, setPayments] = useState([]);

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

  // Map loans only if client is not null
  const simplifiedLoans = client.loans.map((loan) => ({
    name: loan.name,
    amount: loan.amount,
    payments: loan.payments,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(transactionType);
    console.log(accountOrigin);
    console.log(amount);
    console.log(payments);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };
  const handlePaymentChange = (e) => {
    setPayments(e.target.value);
  };

  const handleAccountOriginChange = (e) => {
    setAccountOrigin(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <InformativeSpam
        title="Detailed view of your loans"
        text1="Welcome to your new loan section! Here you can view or request loans quickly and easily."
        text2="Choose the type of loan you need, define the amount you want to request, and send your request. Our process is clear and efficient to help you get what you need."
        text3="Explore the available options and request your loan today to have total control over your finances!"
        imgSrc="/public/loan.png"
      />
      <div className="bg-[#69c2b6d7] m-10 rounded-3xl shadow-2xl p-10">
        <div className="flex py-5 ">
          <div className="flex items-center justify-center w-1/2">
            {
              <Table
                title="Loans"
                ths={["Type", "Amount", "Payments"]}
                tds={simplifiedLoans}
              />
            }
          </div>

          <div className="flex items-center justify-center ">
            <form
              action={""}
              onSubmit={handleSubmit}
              className="p-10 flex flex-col gap-3 bg-[#c0c5ca7a] text-4xl rounded-3xl shadow-2xl items-center"
            >
              <h2 className="text-5xl text-center border-b-2 border-black">
                Request a loan
              </h2>
              <div className="flex items-center justify-between gap-3">
                <Radio
                  options={["Mortgage", "Personal", "Automotive"]}
                  onChange={handleTransactionTypeChange}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <InputSelect
                  name="account"
                  title="Account of origin"
                  options={client.accounts.map((account) => account.number)}
                  onChange={handleAccountOriginChange}
                />
                <InputSelect
                  name="payments"
                  title="Payments"
                  options={[
                    "1 payment",
                    "3 payments",
                    "6 payments",
                    "9 payments",
                    "12 payments",
                    "18 payments",
                    "24 payments",
                    "30 payments",
                    "36 payments",
                    "60 payments",
                  ]}
                  onChange={handlePaymentChange}
                />
              </div>
              <LabelInput
                type="number"
                name="amount"
                title="Amount"
                onChange={handleAmountChange}
              />

              <button
                type="submit"
                className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
