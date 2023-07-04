import React, { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../functions/functions";
import { DataUser } from "./UserDataProvider";

export const UsersReservations = createContext(null);

const ReservationsUserProvider = ({ children }) => {
  const [reservationsList, setReservationsList] = useState(null);
  const { isLogged } = useContext(DataUser);

  useEffect(() => {
    const actualUser = sessionStorage.getItem("currentUser");
    console.log(actualUser);
    if (actualUser) {
      getData(`http://localhost:8001/reservations/user/${actualUser}`).then(
        (res) => {
          sessionStorage.setItem("reservations", JSON.stringify(res.result));
        }
      );
    }
  }, [isLogged]);

  useEffect(() => {
    setReservationsList(JSON.parse(sessionStorage.getItem('reservations')))
  }, [])

  return (
    <UsersReservations.Provider value={{ reservationsList }}>
      {children}
    </UsersReservations.Provider>
  );
};

export default ReservationsUserProvider;
