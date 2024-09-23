import React, { useEffect, useState } from "react";
import Account from "../components/Account";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import SpamInformativo from "../components/SpamInformativo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadClient, addAccountToClient } from "../redux/actions/clientAction";
import Swal from "sweetalert2";
import Buttom from "../components/Buttom";
import imagFinance from "../assets/Finance.png";

const Main = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client.client);
  const status = useSelector((state) => state.client.status);

  window.scrollTo(0, 0);

  const showError = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create an account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it",
    }).then((result) =>  {
      if (result.isConfirmed) {
         dispatch(addAccountToClient())
          .unwrap()
          .catch((error) => setError(error.message));
        console.log(error);

        Swal.fire({
          title: "Congratulations!",
          text: "Your account has been created successfully!",
          icon: "success",
        });
      }
    });
  };

  if (client.firstName === "") {
    dispatch(loadClient());
  }
  // useEffect(() => {
  // if (client.firstName === "") {
  //   dispatch(loadClient());
  // }
  // }, [ dispatch,  ]);
  if(status === "loading"){
    
  }

  if (error) {
    return <p>{error}</p>; // Mostrar mensaje de error si ocurre
  }

  // Verificar si el cliente existe antes de intentar acceder a sus propiedades
  if (!client) {
    return <p>No client data available.</p>; // Mostrar mensaje si no hay cliente
  }

  return (
    <>
      <SpamInformativo
        title={`🙋‍♀️Welcome ${client.firstName} ${client.lastName}`}
        text1="Here you'll find a clear and comprehensive summary of all your bank accounts. 👇"
        text2="✨ Want more details? Simply click on any account to explore more."
        text3="Enjoy a hassle-free banking experience! 🚀"
        imgSrc={imagFinance}
      />
      <div className="flex flex-wrap gap-4 my-10 lg:px-80 justify-evenly bg-[#81ccc1bd] m-5 rounded-3xl p-5 shadow-2xl transition duration-300">
        <h2 className="w-full text-center border-b-2 border-[#111827] px-1 pb-4 text-4xl font-medium text-[#111827]">
          Accounts
        </h2>
        {client.accounts?.map((acc) => (
          <Link key={acc.id} to={`/account/${acc.id}`}>
            <Account
              account={acc.number}
              balance={acc.balance}
              openingDate={acc.creationDate}
            />
          </Link>
        ))}
        {client.accounts?.length === 3 ? (
          <p className="p-5 font-bold rounded-3xl transition duration-300 border-4 border-blue-300 bg-white text-black">You have reached the limit of accounts to request</p>
        ) : (
          <div className="w-full text-center">
            <button
              className="bg-black p-5 font-bold text-white rounded-3xl transition duration-300 border-4 border-blue-300 hover:bg-white hover:text-black  "
              onClick={showError}
            >
              Create Account
            </button>
          </div>
        )}
      </div>
      <Banner />
      <Carousel />
    </>
  );
};

export default Main;
