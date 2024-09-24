import React, { useState } from "react";
import SpamInformativo from "../components/SpamInformativo";
import InputSelect from "../components/InputSelect";
import Radio from "../components/inputs/Radio";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCardToClient, loadClient } from "../redux/actions/clientAction";
import Swal from "sweetalert2";
import addCard from "../assets/addCard.png";

const AddCard = () => {
  const [cardType, setCardType] = useState("EXAMPLE");
  const [cardColor, setCardColor] = useState("EXAMPLE");
  const client = useSelector((state) => state.client.client);
  const status = useSelector((state) => state.client.status);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (client.firstName === "") {
    dispatch(loadClient());
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

  const alertError = (msg) => {
    Swal.fire({
      title: "Oops! Something Went Wrong",
      text: msg,
      icon: "error",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = {
      color: cardColor,
      type: cardType.toUpperCase(),
    };
    if (card.type === "EXAMPLE") {
      alertError("Please select a type");
      return;
    }
    if (card.color === "EXAMPLE") {
      alertError("Please select a color");
      return;
    }

    try {
      // Despachar la acción
      await dispatch(addCardToClient(card)).unwrap();
      alertSuccess(cardType);
      setLoading(false);
      navigate("/Cards");
    } catch (err) {
      alertError(err.message); // Mostrar SweetAlert de error
    } finally {
      if (status === "loading") setLoading(true);
    }
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
        text2="Please note that you can only request 3 cards for each type (DEBIT, CREDIT)"
        imgSrc={addCard}
      />

      <div className="flex items-center justify-center py-10 text-xl ">
        <div className="flex justify-center items-center py-5 bg-[#C4DFFE] rounded-3xl w-full mx-24">
          {availableColorsForCredit.length === 0 && availableColorsForDebit.length === 0 ? (
            <p className="text-3xl p-10 bg-[#ffffff8f] m-10 rounded-xl font-bold ">Cards not available, you have already requested the available credit and debit cards! 💳</p>
          ) : (
            <div className="flex items-center gap-10 justify-center w-1/2 ">
              <Card
              key={""}
              cvv={"***"}
              color={cardColor}
              type={cardType}
              number={"************"}
              expiration={"2034-08-40T16:04:27.11687"}
              name={client.firstName + " " + client.lastName}
            />
              <form
                action={""}
                onSubmit={handleSubmit}
                className="p-5 px-20 flex flex-col gap-3 bg-[#c0c5cad3] text-4xl rounded-3xl shadow-2xl items-center "
              >
                <h2 className="text-5xl text-center border-b-2 border-black w-full">
                  Generate Card
                </h2>
                <div className="flex items-center justify-between gap-3">
                  {availableColorsForDebit.length === 0 ? (
                    <Radio
                      title="Destination Type"
                      options={["CREDIT"]}
                      onChange={(e) => setCardType(e.target.value)}
                    />
                  ) : availableColorsForCredit.length === 0 ? (
                    <Radio
                      title="Destination Type"
                      options={["DEBIT"]}
                      onChange={(e) => setCardType(e.target.value)}
                    />
                  ) : (
                    <Radio
                      title="Destination Type"
                      options={["DEBIT", "CREDIT"]}
                      onChange={(e) => setCardType(e.target.value)}
                    />
                  )}
                </div>

                <InputSelect
                  name="Color"
                  title="Color"
                  options={
                    cardType === "DEBIT"
                      ? availableColorsForDebit
                      : availableColorsForCredit
                  }
                  onChange={(e) => setCardColor(e.target.value)}
                />

                <button
                  type="submit"
                  className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
                  disabled={loading} 
                >
                  {loading ? "Creating card..." : "Create card"}
                </button>

                {/* Mostrar mensajes dependiendo del estado */}
                {loading && <p>Loading...</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCard;
