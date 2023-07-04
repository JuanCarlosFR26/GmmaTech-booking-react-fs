import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDataProvider from "./context/UserDataProvider";
import ReservationsUserProvider from "./context/ReservationsUserProvider";

function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <ReservationsUserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="reservations" element={<Reservations />} />
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </ReservationsUserProvider>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
