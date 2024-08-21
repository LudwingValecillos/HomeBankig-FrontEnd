import React, { useState } from "react";
import SpamInformativo from "../components/SpamInformativo";
import InputSelect from "../components/InputSelect";
import Radio from "../components/inputs/Radio";
import LabelInput from "../components/LabelInput";

const AddCard = () => {
  const [cardType, setCardType] = useState("");
  const [cardColor, setCardColor] = useState("");

  const handleCardTypeChange = (e) => {
    setCardType(e.target.value);
  };

  const handleCardColorChange = (e) => {
    setCardColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = e.value;
    console.log("Submit");
    console.log(url);
  };

  return (
    <div>
      <SpamInformativo
        title={`Add a New Card`}
        text1="✨ Welcome to the creation view of your new bank card. Here, you can bring a new card to life that will accompany you on your financial adventures. 💳"
        text2="👋 Complete the necessary details and, in the blink of an eye, you'll have your new card ready to use. Convenience and control are at your fingertips."
        text3="💼 Remember, every card you create is another key to a future full of opportunities. Do it with confidence and style! 🚀"
        imgSrc="/public/addCard.png"
      />
      <div className="flex items-center justify-center py-10 text-xl">
        <div className="flex justify-center items-center gap-10 py-5 bg-[#C4DFFE] rounded-3xl">
          <img src="/public/card.png" alt="" className="w-1/4" />
          <div className="flex items-center justify-center w-1/2 ">
            <form
              action={""}
              onSubmit={handleSubmit}
              className=" p-10 flex flex-col gap-3 bg-[#c0c5ca7a] text-4xl rounded-3xl shadow-2xl items-center "
            >
              <h2 className="text-5xl text-center border-b-2 border-black">
                New Card
              </h2>
              <div className="flex items-center justify-between gap-3">
                <Radio title="Destination Type" options={["Own", "Others"]} />
              </div>
              <LabelInput type="number" name="amount" title="Amount" />
              <LabelInput
                type="text"
                name="accountNumber"
                title="Recipient's Number"
              />

              <LabelInput type="text" name="description" title="Description" />
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

export default AddCard;
