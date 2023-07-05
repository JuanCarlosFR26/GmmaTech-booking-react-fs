import React, { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../functions/functions";
import { DataUser } from "./UserDataProvider";

export const UsersReservations = createContext(null);

const ReservationsUserProvider = ({ children }) => {
  const [reservationsList, setReservationsList] = useState(null);
  const { isLogged } = useContext(DataUser);

  useEffect(() => {
    const actualUser = sessionStorage.getItem("currentUser");
    try {
      if (actualUser) {
        getData(`http://localhost:8001/reservations/user/${actualUser}`).then(
          (res) => {
            sessionStorage.setItem("reservations", JSON.stringify(res.result));
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLogged]);

  useEffect(() => {
    try {
      const actualReservations = sessionStorage.getItem("reservations");
      setReservationsList(JSON.parse(actualReservations));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UsersReservations.Provider
      value={{ reservationsList, setReservationsList }}
    >
      {children}
    </UsersReservations.Provider>
  );
};

export default ReservationsUserProvider;
