import React, { useContext, useState } from "react";
import BG from "../assets/gamma.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../.firebase/firebase";
import { DataUser } from "../context/UserDataProvider";
import RegisterError from "../components/RegisterError";

const Login = () => {
  const { setIsLogged, setLoggedUser } = useContext(DataUser);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [modalError, setModalError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem('currentUser', email)
          setIsLogged(true);
          navigate('/')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === "auth/wrong-password") {
            setModalError(true);
            setTimeout(() => {
              setModalError(false);
            }, 2000);
          } else if (errorCode === "auth/user-not-found") {
            setErrorEmail(true);
            setTimeout(() => {
              setErrorEmail(false);
            }, 2000);
          }
        });
    } catch (error) {
      console.error("Error al iniciar sesión", error);
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
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-xl shadow-amber-700 p-16 flex flex-col items-center gap-6"
        >
          <h2 className="font-bold text-3xl relative bottom-6">Log in</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="rounded-2xl h-8 p-4 outline-none border border-black"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorEmail && <RegisterError text={"This user is not exists"} />}
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
            {modalError && <RegisterError text={"Invalid password"} />}
          </div>
          <input
            className="bg-teal-800 text-white font-bold p-4 rounded-2xl cursor-pointer hover:bg-amber-500 hover:text-black"
            type="submit"
            value={"Log in"}
          />
          <Link to={"/register"}>
            Don't you have an account?{" "}
            <span className="text-amber-500 font-bold">Click Here!</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
