import React from "react";
import { Link } from "react-router-dom";
import LabelInput from "../components/LabelInput";
import Buttom from "../components/Buttom";

const Register = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/public/bank3.jpeg"
            className="absolute inset-0 object-cover w-full h-full opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <img
              src="/public/unnamed.jpeg"
              alt=""
              className="w-20 rounded-full"
            />

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to QuantumBank
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

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to QuantumBank
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Sign up to access your online bank account. Create your profile,
                set up your security credentials, and start managing your
                finances with full control and convenience from anywhere.
              </p>
            </div>

            <form action="#" className="flex flex-col gap-4 w-96">
              <h2 className="text-5xl text-center">Sign up</h2>
              <LabelInput
                type="name"
                name="name"
                title="First Name"
                // onChange={handleChange}
              />
              <LabelInput
                type="name"
                name="lastName"
                title="Last Name"
                // onChange={handleChange}
              />

              <LabelInput
                type="email"
                name="email"
                title="Email"
                // onChange={handleChange}
              />

              <LabelInput
                type="password"
                name="password"
                title="Password"
                // onChange={handleChange}
              />

              <button
                type="submit"
                className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
              >
                Sign up
              </button>
              <Link to="/login">
                {" "}
                <Buttom href="#" title="Log in"></Buttom>{" "}
              </Link>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
