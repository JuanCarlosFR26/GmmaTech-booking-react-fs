import React, { useContext, useEffect, useState } from "react";
import { DataUser } from "../context/UserDataProvider";
import { getData } from "../functions/functions";
import { UsersReservations } from "../context/ReservationsUserProvider";

const Home = () => {
  const { loggedUser } = useContext(DataUser);
  const { reservationsList } = useContext(UsersReservations)

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-white text-4xl">Welcome {loggedUser}</h1>
      {reservationsList ? (
        reservationsList.map((reservation) => (
          <div>
            <h2>{reservation.reservation_id}</h2>
            <p>Starts at {reservation.time_start}</p>
            <p>Ends at {reservation.time_end}</p>
          </div>
        ))
      ) : (
        <div>Dont have reservations</div>
      )}
    </div>
  );
};

export default Home;
