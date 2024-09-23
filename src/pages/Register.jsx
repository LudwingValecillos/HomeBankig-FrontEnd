import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LabelInput from "../components/LabelInput";
import Button from "../components/Buttom"; // Asegúrate de que el nombre sea correcto
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import axios from "axios";
import Swal from "sweetalert2";
import img  from "../assets/bank2.jpeg";
import logo from "../assets/unnamed.jpeg";


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  // Verificar si las contraseñas coinciden cada vez que cambien
  useEffect(() => {
    const { password, confirmPassword } = formData;
    setPasswordMatch(password === confirmPassword || confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(formData.firstName === ""){
      alertError("First Name is required");
    }
    if(formData.lastName === ""){
      alertError("Last Name is required");
    }
    if(formData.email === ""){
      alertError("Email is required");
    }
    if(formData.password === ""){
      alertError("Password is required");
    }
    if(formData.password !== formData.confirmPassword){
      alertError("Password does not match");
    }
    if (
      formData.password === formData.confirmPassword &&
      formData.password !== "" &&
      formData.email !== "" &&
      formData.firstName !== ""  &&
      formData.lastName !== ""
    ) {
      console.log(formData);
      console.log("Submit");
      formData.email = formData.email.toLowerCase();
      sendPutRequest(formData);
    }
  };


  const sendPutRequest = async (data) => {
    
    // try {
    //   const response = await axios.post(
    //     "https://homebankig.onrender.com/api/auth/register",
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log("Response:", response.data);
    //   navigate("/login");
    // } catch (error) {
    //   alertError(error.response.data);
    // }
    try {
      const response = await axios.post(
        "https://homebankig.onrender.com/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      
      alertError(error.response.data);
    }
  };
const alertWarning = () => {
  Swal.fire({
    title: "Oops! Something Went Wrong",
    text: "Please complete all fields",
    icon: "warning",
  });
};

  const alertError = (msg) => {
    Swal.fire({
      title: "Oops! Something Went Wrong",
      text: msg,
      icon: "error",
    });
  };


  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={img}
            className="absolute inset-0 object-cover w-full h-full opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <img
              src={logo}
              alt=""
              className="w-20 rounded-full"
            />
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to QuantumBank a
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Sign up to access your online bank account. Create your profile,
              set up your security credentials, and start managing your finances
              with full control and convenience from anywhere.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative block -mt-16 lg:hidden">
              <img
                src="/public/unnamed.jpeg"
                alt=""
                className="w-20 rounded-full"
              />
            </div>

            <form onSubmit={handleSubmit} className="flex pt-16  px-4 lg:pt-0 lg:px-0 flex-col gap-4 w-96">
              <h2 className="text-5xl text-center">Sign up</h2>
              <LabelInput
                type="text"
                name="firstName"
                title="First Name"
                value={(formData.firstName)  }
                onChange={handleChange}
              />
              <LabelInput
                type="text"
                name="lastName"
                title="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <EmailInput
                name="email"
                title="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <PasswordInput
                name="password"
                title="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordInput
                name="confirmPassword"
                title="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {!passwordMatch && (
                <p className="text-red-500">Passwords do not match</p>
              )}
              <button
                type="submit"
                className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
              >
                Sign up
              </button>
              <Link to="/login">
                <Button title="Log in" />
              </Link>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
