import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../.firebase/firebase";

export const DataUser = createContext(null);

const UserDataProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    const actualUser = sessionStorage.getItem('currentUser')
    try {
      if (actualUser) {
        const userId = await fetch(`http://localhost:8001/user/${actualUser}`);
        const response = await userId.json();
        const idUser = response.result[0].user_id;
        sessionStorage.setItem("user_id", idUser);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const logged = auth.currentUser
        setLoggedUser(logged.email);
        fetchData();
      } else {
        navigate("/login");
      }
    });
  }, [isLogged]);

  return (
    <DataUser.Provider
      value={{
        isLogged,
        setIsLogged,
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </DataUser.Provider>
  );
};

export default UserDataProvider;
