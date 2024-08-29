import React, { useState } from "react";
import LabelInput from "../components/LabelInput";
import Button from "../components/Buttom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log("Submit");
    formData.email = formData.email.toLowerCase();
    sendPutRequest(formData);
  };
  const sendPutRequest = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response:', response.data);
    localStorage.setItem('token', response.data);
    navigate('/accounts/');
    } catch (error) {
      alert("Credenciales incorrectas")
      console.error('There was an error!', error);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/public/bank1.jpeg"
            className="absolute inset-0 object-cover w-full h-full opacity-90"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
          <img src="/public/unnamed.jpeg" alt="" className="w-20 rounded-full"/>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to QuantumBank
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Securely access your bank account through our login portal. Enter
              your credentials to manage your finances, check balances, make
              transfers, and more, all from the comfort of your home.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative block -mt-16 lg:hidden">
            <img src="/public/unnamed.jpeg" alt="" className="w-20 rounded-full"/>


              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to QuantumBank

              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
              Securely access your bank account through our login portal. Enter
              your credentials to manage your finances, check balances, make
              transfers, and more, all from the comfort of your home.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
              <h2 className="text-5xl text-center">Login</h2>

              <LabelInput
                type="email"
                name="email"
                title="Email"
                onChange={handleChange}
              />

              <LabelInput
                type="password"
                name="password"
                title="Password"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
              >
                Enter
              </button>
              <Button href="#" title="Forgot my password"></Button>
              <Link to="/register">
                {" "}
                <Button href="#" title="Register"></Button>{" "}
              </Link>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
