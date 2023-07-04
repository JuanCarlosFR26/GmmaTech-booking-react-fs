import { signOut } from "firebase/auth";
import { Outlet, Link } from "react-router-dom";
import { auth } from "../.firebase/firebase";
import { useContext } from "react";
import { DataUser } from "../context/UserDataProvider";
import { UsersReservations } from "../context/ReservationsUserProvider";

const Layout = () => {

  const { loggedUser, setLoggedUser, setIsLogged } = useContext(DataUser);
  const { setReservationsList } = useContext(UsersReservations);

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      console.log('Sign-out successful');
      setIsLogged(false)
      setLoggedUser(null)
      setReservationsList(null);
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('reservations');
      sessionStorage.removeItem('currentUser');
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <>
      <nav className="w-screen bg-amber-600 text-white font-bold text-2xl">
        <ul className="flex w-3/4 ml-40 justify-between items-center h-20">
          <div className="flex gap-20">
            <li className="hover:text-pink-700">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-pink-700">
              <Link to="/rooms">Rooms</Link>
            </li>
            <li className="hover:text-pink-700">
              <Link to="/reservations">Reservations</Link>
            </li>
          </div>
          <div className="flex gap-20">
            <li >
              <p className="flex gap-8 text-sm items-center"> {loggedUser} <Link className="text-2xl hover:text-pink-700" onClick={() => handleLogout()} to="/login"> Log out</Link></p>
            </li>
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
