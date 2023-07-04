import React, { useEffect, useState } from "react";
import { getData } from "../functions/functions";

const Reservations = () => {
  const [reservations, setReservations] = useState(null);
  const [openForm, setOpenform] = useState(false);

  const openFm = () => {
    setOpenform(true);
  };

  const closeFm = () => {
    setOpenform(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationData = await getData(
          `http://localhost:8001/reservations`
        );
        setReservations(reservationData.result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-20 w-screen h-screen flex flex-col items-center gap-40">
      <div className="">
        {openForm ? (
          <form className="relative p-10 w-96 h-auto bg-teal-300 rounded-2xl flex flex-col items-center justify-center gap-4">
            <i
              onClick={() => closeFm()}
              className="fa-solid fa-x cursor-pointer absolute top-2 right-2 self-end p-2 text-white bg-red-600 rounded-full"
            ></i>
            <div className="flex flex-col gap-2">
              <label htmlFor="room">Room</label>
              <input
                className="rounded-2xl h-8 p-4 outline-none"
                type="text"
                name="room"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timeStart">From</label>
              <input
                className="rounded-2xl h-8 p-4 outline-none"
                type="datetime-local"
                name="timeStart"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timeEnd">To</label>
              <input
                className="rounded-2xl h-8 p-4 outline-none"
                type="datetime-local"
                name="timeEnd"
              />
            </div>
            <input
              className="bg-teal-800 text-white font-bold p-4 rounded-2xl cursor-pointer hover:bg-amber-500 hover:text-black"
              type="submit"
              value={"Make"}
            />
          </form>
        ) : (
          <button
            className="p-4 bg-teal-800 text-white font-bold rounded-3xl"
            onClick={() => openFm()}
          >
            Make your reservation
          </button>
        )}
      </div>
      <div className="flex gap-10 fixed top-[600px]">
        {reservations ? (
          reservations.map((reservation, i) => (
            <div className="bg-orange-600 p-6 rounded-2xl font-bold" key={i}>
              <h5>Room {reservation.room_name}</h5>
              <h2>Reserved by {reservation.name}</h2>
              <p>
                Reserved from {reservation.time_start} to {reservation.time_end}
              </p>
            </div>
          ))
        ) : (
          <div>No reservations</div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
