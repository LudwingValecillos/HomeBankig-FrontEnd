import React from "react";
import Card from "../components/Card";

const PrintCard = (promps) => {
  let cards = promps.client.cards.map((card) => card);
  console.log(cards);

  return (
    <div className="flex justify-center py-10 bg-[#81ccc1ce] m-5 rounded-3xl">
      {promps.client.cards.some((card) => card.type === "CREDIT") ? (
        <article className="flex flex-col items-center w-1/2 gap-4">
          <h2 className="text-2xl text-center border-b-2 border-black">
            CREDIT
          </h2>
          {promps.client.cards
            .filter((card) => card.type === "CREDIT")
            .map((card) => (
              <Card
                key={card.id}
                cvv={card.cvv}
                color={card.color}
                type={card.type}
                number={card.number}
                expiration={card.thruDate}
                name={card.clientHolder}
              />
            ))}
        </article>
      ) : null}

      {promps.client.cards.some((card) => card.type === "DEBIT") ? (
        <article className="flex flex-col items-center w-1/2 gap-4">
          <h2 className="text-2xl text-center border-b-2 border-black">
            DEBIT
          </h2>
          {promps.client.cards
            .filter((card) => card.type === "DEBIT")
            .map((card) => (
              <Card
                key={card.id}
                cvv={card.cvv}
                color={card.color}
                type={card.type}
                number={card.number}
                expiration={card.thruDate}
                name={card.clientHolder}
              />
            ))}
        </article>
      ) : null}
    </div>
  );
};

export default PrintCard;
