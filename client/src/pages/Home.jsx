import React, { useContext, useEffect, useState } from "react";
import { DataUser } from "../context/UserDataProvider";
import { UsersReservations } from "../context/ReservationsUserProvider";
import PacmanLoader from 'react-spinners/PacmanLoader'
import { deleteReservation } from "../functions/functions";

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
  }, []);

  const handleDelete = async (id) => {
    try {
      const response =  await deleteReservation(`http://localhost:8001/reservation/delete/${id}`)
      if(response.ok) {
        const reservasActualizadas = JSON.parse(sessionStorage.getItem('reservations')).filter(reserva => reserva.id !== id)
        sessionStorage.setItem('reservas', JSON.stringify(reservasActualizadas))
        const updateReservs = reservs.filter(reserv => reserv.id !== id)
        setReservs(updateReservs)
        console.log('reserva eliminada')
        setLoading(true);
      } else {
        console.log('Error al eliminar reserva')
      }
    } catch (error) {
      console.error(error)
    }

  }

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
              className="bg-userReservation relative text-white flex flex-col p-8 rounded-3xl shadow-xl shadow-amber-700 items-center w-1/4"
            >
              <i onClick={() => handleDelete(reservation.reservation_id)} className="fa-solid fa-x absolute top-4 right-5 cursor-pointer p-2 bg-black rounded-full"></i>
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
