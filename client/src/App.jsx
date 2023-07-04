import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from "./layout/Layout";
import Rooms from './pages/Rooms';
import Reservations from "./pages/Reservations";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="register" element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
