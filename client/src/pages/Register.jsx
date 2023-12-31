import React, { useContext, useState } from "react";
import BG from "../assets/gamma.jpg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../.firebase/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { DataUser } from "../context/UserDataProvider";
import { addUser } from "../functions/functions";
import RegisterError from "../components/RegisterError";

const Register = () => {
  const { setIsLogged } = useContext(DataUser);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [modalError, setModalError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    let userExists = await fetchSignInMethodsForEmail(auth, email);

    try {
      if (userExists.length > 0) {
        setModalError(true);
        setInterval(() => {
          setModalError(false);
        }, 3000);
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });

        addUser("http://localhost:8001/user/create", email);
        setIsLogged(true)
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div
        className="w-2/4 h-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('${BG}')` }}
      ></div>
      <div className="w-2/4 h-full bg-red-200 flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="bg-white rounded-2xl shadow-xl shadow-amber-700 p-16 flex flex-col items-center gap-6"
        >
          <h2 className="font-bold text-3xl relative bottom-6">Register</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-2xl h-8 p-4 outline-none border border-black"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {modalError && <RegisterError text={'This user already exists'}/>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="rounded-2xl h-8 p-4 outline-none border border-black"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input
            className="bg-teal-800 text-white font-bold p-4 rounded-2xl cursor-pointer hover:bg-amber-500 hover:text-black"
            type="submit"
            value={"Register"}
          />
          <Link to={"/login"}>
            Have already an account?{" "}
            <span className="text-amber-500 font-bold">Click Here!</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
