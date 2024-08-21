import React, { useEffect, useRef, useState } from "react";
import InformativeSpam from "../components/SpamInformativo";
import LabelInput from "../components/LabelInput";
import InputSelect from "../components/InputSelect";
import axios from "axios";
import Radio from "../components/inputs/Radio";

const Transactions = () => {
  const [client, setClient] = useState(null);

  const [transactionType, setTransactionType] = useState("");
  const [accountOrigin, setAccountOrigin] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clients/")
      .then((response) => {
        setClient(response.data.find((client) => client.id === 1));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!client) {
    return <p>Loading client data...</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(transactionType);
    console.log(accountOrigin);
    console.log(amount);
    console.log(accountNumber);
    console.log(description);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleAccountOriginChange = (e) => {
    setAccountOrigin(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <InformativeSpam
        title="Transaction View"
        text1="Welcome to your financial management space! Here you can perform transactions and transfers quickly and securely."
        text2="You can send money, receive funds, and check the history of your transactions and transfers. Keep total control over your financial operations from one place."
        text3="Explore your options and manage your finances with ease and efficiency!"
        imgSrc="/public/transactions.png"
      />
      <div className="flex bg-[#C4DFFE] m-10 rounded-3xl shadow-2xl">
        <div className="w-1/2">
          <img src="/public/transactionsdiv.png" alt="" />
        </div>

        <div className="flex items-center justify-center w-1/2 ">
          <form
            action={""}
            onSubmit={handleSubmit}
            className="p-10 flex flex-col gap-3 bg-[#c0c5ca7a] text-4xl rounded-3xl shadow-2xl items-center"
          >
            <h2 className="text-5xl text-center border-b-2 border-black">
              Transfer
            </h2>
            <div className="flex items-center justify-between gap-3">
              <Radio
                options={["Own", "Others"]}
                ref={inputRef}
                onChange={(e) => {
                  console.log(e.target.value);
                  inputRef.current = e.target.value;
                  console.log(inputRef);

                  handleTransactionTypeChange(e);
                  console.log(transactionType);
                }}
              />
            </div>
            <div
              className={` flex gap-3 items-center ${
                transactionType == "Others" || !transactionType
                  ? "flex-col"
                  : ""
              }`}
            >
              <InputSelect
                name="accountOrigin"
                title="Account of origin"
                options={client.accounts.map((account) => account.number)}
                ref={selectRef}
                onChange={(e) => {
                  selectRef.current = e.target.value;
                  console.log(selectRef);
                  handleAccountOriginChange(e);
                }}
              />
              {inputRef.current === "Own" ? (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

                <InputSelect
                  name="accountDestiny"
                  title="Destination account"
                  options={client.accounts
                    .filter((account) => account.number !== selectRef.current)
                    .map((account) => account.number)}
                  onChange={handleAccountOriginChange}
                />
                </>
              ) : (
                <LabelInput
                  type="text"
                  name="accountNumber"
                  title="Account number"
                  onChange={handleAccountNumberChange}
                />
              )}
            </div>
            <LabelInput
              type="number"
              name="amount"
              title="Amount"
              onChange={handleAmountChange}
            />

            <LabelInput
              type="text"
              name="description"
              title="Description"
              onChange={handleDescriptionChange}
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
    </>
  );
};

export default Transactions;
