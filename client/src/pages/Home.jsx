import React, { useContext, useEffect, useState } from "react";
import { DataUser } from "../context/UserDataProvider";
import { UsersReservations } from "../context/ReservationsUserProvider";
import PacmanLoader from 'react-spinners/PacmanLoader'

const Home = () => {
  const { loggedUser } = useContext(DataUser);
  const { reservationsList } = useContext(UsersReservations);
  const [reservs, setReservs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setReservs(JSON.parse(sessionStorage.getItem("reservations")));
    } catch (error) {
      console.error(error)
    }
    if (reservs === null) {
      setLoading(true);
    } else {
      setLoading(false)
    }

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);

  console.log(reservs);

  return (
    <div className="flex flex-col items-center justify-center mt-20 w-screen">
      <h1 className="font-bold text-white text-4xl bg-userReservation p-2 shadow-md shadow-amber-600 rounded-2xl">
        Welcome {loggedUser}
      </h1>
      <div className="w-3/4 flex flex-wrap items-center justify-center gap-6 p-10 font-bold">

        {reservs ? (
          reservs.map((reservation, i) => (
            <div
              key={i}
              className="bg-userReservation text-white flex flex-col p-8 rounded-3xl shadow-xl shadow-amber-700 items-center w-1/4"
            >
              <h2>Reservation {reservation.reservation_id}</h2>
              <p>Starts at {reservation.time_start}</p>
              <p>Ends at {reservation.time_end}</p>
            </div>
          ))
        ) : (
          <div className="font-bold text-4xl">{loading ? <PacmanLoader color="#FFFFFF" size={100} /> : "Don't have reservations"}</div>
        )}
      </div>
    </div>
  );
};

export default Home;
