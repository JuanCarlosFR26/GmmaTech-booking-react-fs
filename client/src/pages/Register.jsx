import React from "react";
import BG from "../assets/gamma.jpg";

const Register = () => {
  return (
    <div className="w-screen h-screen flex">
      <div
        className="w-2/4 h-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('${BG}')` }}
      ></div>
      <div className="w-2/4 h-full bg-red-200 flex items-center justify-center">
        <form className="bg-white p-20 flex ">
          <h2>Register</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-2xl h-8 p-4 outline-none"
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="rounded-2xl h-8 p-4 outline-none"
              type="password"
              name="password"
            />
          </div>
          <input
            className="bg-teal-800 text-white font-bold p-4 rounded-2xl cursor-pointer hover:bg-amber-500 hover:text-black"
            type="submit"
            value={"Register"}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
