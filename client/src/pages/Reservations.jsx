import React, { useContext, useEffect, useState } from "react";
import { DataUser } from "../context/UserDataProvider";
import Modal from "../components/Modal";

const Reservations = () => {

  const [reservations, setReservations] = useState(null);
  const [openForm, setOpenform] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [modal, setModal] = useState(false);

  const fetchData = async () => {
    try {
      const reservationData = await fetch(`http://localhost:8001/reservations`);
      const response = await reservationData.json();
      setReservations(response.result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openFm = () => {
    setOpenform(true);
  };

  const closeFm = () => {
    setOpenform(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedIdUser = parseInt(sessionStorage.getItem("user_id"));
    const formattedRoom = parseInt(roomId);
    const formattedStart = timeStart.replace("T", " ");
    const formattedEnd = timeEnd.replace("T", " ");

    const reservationData = {
      user_id: formattedIdUser,
      room_id: formattedRoom,
      time_start: formattedStart,
      time_end: formattedEnd,
    };

    try {
        const response = await fetch(
          `http://localhost:8001/reservation/create`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(reservationData),
          }
        );
        setReservations((prev) => [...prev, reservationData]);
        setModal(true);
        setInterval(() => {
          setModal(false);
        }, 2000)
      } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="mt-20 w-screen h-screen flex flex-col items-center gap-20 p-10">
      <div className="">
        {openForm ? (
          <form
            onSubmit={handleSubmit}
            className="relative p-10 w-96 h-auto bg-amber-200 rounded-2xl flex flex-col items-center justify-center gap-4"
          >
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
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timeStart">From</label>
              <input
                className="rounded-2xl h-8 p-4 outline-none"
                type="datetime-local"
                name="timeStart"
                onChange={(e) => setTimeStart(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timeEnd">To</label>
              <input
                className="rounded-2xl h-8 p-4 outline-none"
                type="datetime-local"
                name="timeEnd"
                onChange={(e) => setTimeEnd(e.target.value)}
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
      <div className="flex flex-col items-center gap-20 bg-reservations shadow-xl shadow-amber-800 w-3/4 p-6 rounded-2xl">
      { modal && <Modal text={'Reservation Done!'} className={'flex items-center justify-center bg-green-500 w-[200px] h-[80px] font-bold text-white rounded-2xl'}/>}
        <h2 className="text-3xl font-bold">All the Reservations</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {reservations ? (
            reservations.map((reservation, i) => (
              <div className="bg-orange-600 p-6 rounded-2xl font-bold" key={i}>
                <h5>Room {reservation.room_name}</h5>
                <h2>Reserved by {reservation.name}</h2>
                <p>
                  Reserved from {reservation.time_start} to{" "}
                  {reservation.time_end}
                </p>
              </div>
            ))
          ) : (
            <div>No reservations</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
