import React, { useState } from "react";
import LabelInput from "../components/LabelInput";
import Button from "../components/Buttom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import PasswordInput from "../components/PasswordInput";
import Swal from "sweetalert2";
import logo from "../assets/unnamed.jpeg";
import img  from "../assets/bank1.jpeg";
import { loadClient } from "../redux/actions/clientAction";
import { loadLoans } from "../redux/actions/loanAction";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alertError = (msg) => {
    Swal.fire({
      title: "Oops! Something Went Wrong",
      text: msg,
      icon: "error",
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(user);
    
    if(user.email == "" ){
      alertError("Email is required")
      return
    }
    if(user.password == ""){
      alertError("Password is required")
      return;
    }
    
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",user);
      localStorage.setItem("token", res.data);
      console.log(res.data);

      navigate("/accounts/");
      dispatch(loadClient());
    } catch (err) {
      alertError(err.response.data)
      
    }
  };
  

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen  lg:grid-cols-12">
        <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={img} 
            className="absolute inset-0 object-cover w-full h-full opacity-90"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <img
              src={logo}
              alt=""
              className="w-20 rounded-full"
            />
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
            <form onSubmit={handleLogin} className="flex flex-col px-4 lg:px-0 gap-4 w-96">
              <h2 className="text-5xl text-center">Login</h2>
              <LabelInput
                type="email"
                name="email"
                title="Email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <PasswordInput
                name="password"
                title="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg"
              >
                Enter
              </button>
              <Button href="#" title="Forgot my password" />
              <Link to="/register">
                <Button href="#" title="Register" />
              </Link>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
