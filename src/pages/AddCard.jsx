import React, { useEffect, useState } from "react";
import SpamInformativo from "../components/SpamInformativo";
import InputSelect from "../components/InputSelect";
import Radio from "../components/inputs/Radio";
import LabelInput from "../components/LabelInput";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/authenticationAction";
import { addCardToClient } from "../redux/actions/clientAction";
import Swal from "sweetalert2";

const AddCard = () => {
  const [cardType, setCardType] = useState("CREDIT");
  const [cardColor, setCardColor] = useState("GOLD");
  const client = useSelector((state) => state.client.client);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (client.firstName === "") {
    dispatch(loginAction());
  }
  const alertSuccess = (msg) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: msg + " card created",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const alertError = (msg) =>{
    Swal.fire({
      title: "Oops! Something Went Wrong",
      text: msg,
      icon: "error"
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const card = {
      color: cardColor,
      type: cardType.toUpperCase(),
    };

    axios
      .post("http://localhost:8080/api/cards/clients/current/cards", card, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(addCardToClient(res.data));
        alertSuccess(res.data.type);
        navigate("/cards");
      })
      .catch((err) => {
        alertError(err.response.data);
      });
  };

  const availableColors = ["GOLD", "SILVER", "TITANIUM"]; // Lista de colores posibles

  const colorDebitCard = client.cards
    .filter((card) => card.type === "DEBIT")
    .map((card) => card.color);

  const colorCreditCard = client.cards
    .filter((card) => card.type === "CREDIT")
    .map((card) => card.color);

  const availableColorsForDebit = availableColors.filter(
    (color) => !colorDebitCard.includes(color)
  );

  const availableColorsForCredit = availableColors.filter(
    (color) => !colorCreditCard.includes(color)
  );

  return (
    <div>
      <SpamInformativo
        title={`Add a New Card`}
        text1="✨ Welcome to the creation view of your new bank card. Here, you can bring a new card to life that will accompany you on your financial adventures. 💳"
        imgSrc="/public/addCard.png"
      />
      <div className="flex items-center justify-center py-10 text-xl">
        <div className="flex justify-center items-center gap-10 py-5 bg-[#C4DFFE] rounded-3xl w-1/2">
          {/* <img src="/public/card.png" alt="" className="w-1/4" /> */}
          <Card
            key={""}
            cvv={"***"}
            color={cardColor}
            type={cardType}
            number={"************"}
            expiration={"2034-08-40T16:04:27.11687"}
            name={client.firstName + " " + client.lastName}
          />
          <div className="flex items-center justify-center w-1/2 ">
            <form
              action={""}
              onSubmit={handleSubmit}
              className=" p-10 flex flex-col gap-3 bg-[#c0c5cad3] text-4xl rounded-3xl shadow-2xl items-center "
            >
              <h2 className="text-5xl text-center border-b-2 border-black">
                Generate Card
              </h2>
              <div className="flex items-center justify-between gap-3">
                <Radio
                  title="Destination Type"
                  options={["DEBIT", "CREDIT"]}
                  onChange={(e) => setCardType(e.target.value)}
                />
              </div>

              <InputSelect
                name="Color"
                title="Color"
                options={
                  cardType == "DEBIT"
                    ? availableColorsForDebit
                    : availableColorsForCredit
                }
                onChange={(e) => setCardColor(e.target.value)}
              />
              <button
                type="submit"
                className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
              >
                Create card
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
