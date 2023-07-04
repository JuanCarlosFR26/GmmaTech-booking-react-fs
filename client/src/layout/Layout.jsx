import { Outlet, Link } from "react-router-dom";

const Layout = () => {
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
              <Link to="/register">Register</Link>
            </li>
            <li className="hover:text-pink-700">
              <Link to="/login">Login</Link>
            </li>
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
