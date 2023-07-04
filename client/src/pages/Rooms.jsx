import React, { useEffect, useState } from "react";
import { getData } from "../functions/functions";
import blue from "../assets/blue.jpg";
import black from "../assets/black.jpg";
import pink from "../assets/pink.jpg";
import yellow from "../assets/yellow.jpg";
import red from "../assets/red.jpg";
import white from "../assets/white.jpg";
import TV from "../assets/tv.png";
import NOTV from "../assets/notv.png";
import AIR from "../assets/air.png";
import NOAIR from "../assets/noair.png";

const Rooms = () => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await getData(`http://localhost:8001/rooms`);
        setRooms(roomsData.result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-8 w-full p-10'>
      {rooms &&
        rooms.map((room, i) => (
          <div
            key={i}
            className="bg-amber-100 flex flex-col items-center justify-center gap-10 w-2/4 p-8 rounded-3xl shadow-2xl shadow-amber-900"
          >
            <img src={room.room_name === 'Blue' ? blue : room.room_name === 'Yellow' ? yellow : room.room_name === 'Black' ? black : room.room_name === 'White' ? white : room.room_name === 'Pink' ? pink : red} alt={room.room_name.toLowerCase()}></img>
            <h2>{room.room_name} Room - #Id {room.room_id}</h2>
            <p className="flex gap-4 items-center font-bold">{room.tv ? "With TV" : "Without TV"} - <img className="w-10" src={room.tv ? TV : NOTV}></img></p>
            <p className="flex gap-4 items-center font-bold">
              {room.air_conditioning
                ? "With air conditioning"
                : "Without air conditioning"} - <img className="w-10" src={room.air_conditioning ? AIR : NOAIR}></img>
            </p>
          </div>
        ))}
    </div>
  );
};

export default Rooms;
