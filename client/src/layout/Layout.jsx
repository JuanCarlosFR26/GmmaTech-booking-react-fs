import { signOut } from "firebase/auth";
import { Outlet, Link } from "react-router-dom";
import { auth } from "../.firebase/firebase";

const Layout = () => {

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      console.log('Sign-out successful');
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
            <li className="hover:text-pink-700">
              <Link onClick={() => handleLogout()} to="/login">Log out</Link>
            </li>
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
