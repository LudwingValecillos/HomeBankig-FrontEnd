import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import InformativeSpam from "../components/SpamInformativo";
import Table from "../components/Table";
import InputSelect from "../components/InputSelect";
import Radio from "../components/inputs/Radio";
import FormattedNumberInput from "../components/FormattedNumberInput";

import { loadClient } from "../redux/actions/clientAction";
import { loadLoans } from "../redux/actions/loanAction";

import loan from "../assets/loan.png";

const Loans = () => {
  const [transactionType, setTransactionType] = useState("");
  const [accountOrigin, setAccountOrigin] = useState("");
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [paymentSelected, setPaymentSelected] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);

  const client = useSelector((state) => state.client.client);
  const loansAvailable = useSelector((state) => state.loansAvilable.loansAvilable);
  const state = useSelector((state) => state.loansAvilable.status);
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loansAvailable[0].id);
    
    if(loansAvailable[0].id == 0 || state == "idle"){
      
      dispatch(loadLoans()).unwrap();
    }
    
    if (client.firstName === "") {
      dispatch(loadClient());
    }
  },[loansAvailable, client])
 

  const simplifiedLoans = Array.isArray(client.loans)
    ? client.loans.map((loan) => ({
        name: loan.name,
        amount: loan.amount,
        payments: loan.payments,
      }))
    : [];

  // Alertas de éxito y error
  const alertSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Loan applied",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const alertError = (msg) => {
    Swal.fire({
      title: "Oops! Something Went Wrong",
      text: msg,
      icon: "error",
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const transaction = {
      id:
    
        transactionType === "Mortgage"
          ? 1
          : transactionType === "Automotive"
          ? 3
          : transactionType === "Personal"
          ? 2 
          :0,
      amount: amount,
      payments: paymentSelected.slice(0, 2).toString(),
      destinationAccount: accountOrigin,
    };
    if(transaction.id === 0){
      alertError("Please select a loan type");
      return;
    }
    if(transaction.amount === ""){
      alertError("Please enter an amount");
      return;
    }
    if(transaction.payments === ""){
      alertError("Please enter a number of payments");
      return;
    }
    if(transaction.destinationAccount === ""){
      alertError("Please select an account");
      return;
    }

    axios.post("http://localhost:8080/api/loans/apply", transaction, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alertSuccess();
        dispatch(loadClient());
        dispatch(loadLoans());
        navigate("/accounts/");
      })
      .catch((error) => {
        alertError(error.response.data);
      });
  };

  // Manejo de cambios en el tipo de préstamo
  const handleTransactionTypeChange = (e) => {
    const selectedLoanName = e.target.value;
    setTransactionType(selectedLoanName);

    const selectedLoanData = loansAvailable.find(
      (loan) => loan.name === selectedLoanName
    );

    if (selectedLoanData) {
      setSelectedLoan(selectedLoanData);
      setPayments(
        selectedLoanData.payments.map((payment) => `${payment} payments`)
      );
    }
  };

  // Otros handlers
  const handleAccountOriginChange = (e) => setAccountOrigin(e.target.value);

  const handleAmountChange = (e) => {
    const selectedLoanData = loansAvailable.find(
      (loan) => loan.name === transactionType
    );
    if (e.target.value > selectedLoanData.maxAmount) {
      alertError(
        `The maximum amount is ${selectedLoanData.maxAmount.toLocaleString()}`
      );
    }
    setAmount(e.target.value);
  };

  return (
    <div>
      <InformativeSpam
        title="Detailed view of your loans"
        text1="Welcome to your new loan section! Here you can view or request loans quickly and easily."
        text2="Choose the type of loan you need, define the amount you want to request, and send your request."
        text3="Explore the available options and request your loan today!"
        imgSrc={loan}
      />
      <div className="bg-[#69c2b6d7] m-3 p-2 rounded-3xl shadow lg:m-10 lg:shadow-2xl lg:p-10">
        <div className="flex flex-col lg:flex-row lg:py-5 justify-evenly">
          {simplifiedLoans.length === 0 ? (
            <div className="flex items-center justify-center lg:w-1/2">
              <h2 className="text-3xl text-center bg-white m-5 p-5 rounded-3xl shadow-2xl">
                You don't have any active loans yet! Request your first loan now for quick and easy financial support. Explore your options and get started today!
              </h2>
            </div>
          ) : (
            <div className="flex items-center justify-center lg:w-1/2">
              <Table
                title="Loans"
                ths={["Type", "Amount", "Payments"]}
                tds={simplifiedLoans}
              />
            </div>
          )}

          <div className="flex items-center justify-center">
            {client.loans?.length < 3 ? (
              <form
                onSubmit={handleSubmit}
                className="p-10 flex flex-col gap-3 bg-[#c0c5ca7a] text-4xl rounded-3xl shadow-2xl items-center"
              >
                <h2 className="lg:text-5xl text-center border-b-2 border-black">
                  Request a loan
                </h2>

                <div className="flex items-center justify-between gap-3">
                  <Radio
                    options={loansAvailable.map((loan) => loan.name)}
                    onChange={handleTransactionTypeChange}
                  />
                </div>
                <p className="text-2xl bg-[#ffffff] p-2 rounded-2xl">
                  Available amount: ${selectedLoan?.maxAmount.toLocaleString() || 0}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <InputSelect
                    name="account"
                    title="Account of origin"
                    options={client.accounts?.map((account) => account.number) || []}
                    onChange={handleAccountOriginChange}
                  />
                  <InputSelect
                    name="payments"
                    title={!selectedLoan ? `Select a loan` : "Payments"}
                    options={payments}
                    onChange={(e) => setPaymentSelected(e.target.value)}
                  />
                </div>

                <FormattedNumberInput
                  name="amount"
                  title="Amount"
                  value={amount}
                  onChange={handleAmountChange}
                />

                <button
                  type="submit"
                  className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center w-1/2">
                <h2 className="text-xl text-center m-2 p-2 border-blue-400 border-8 bg-white lg:m-5 lg:p-5 rounded-3xl shadow-2xl lg:text-3xl">
                  You have reached the limit of loans you can request.
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
