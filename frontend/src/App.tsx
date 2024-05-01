import { Layout } from "./layouts/Layout";
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";
import Register from "./pages/Register";
// import SignIn from "./pages/SignIn";
// import AddHotel from "./pages/AddHotel";
// import { useAppContext } from "./contexts/AppContext";
// import MyHotels from "./pages/MyHotels";
// import EditHotel from "./pages/EditHotel";
// import Search from "./pages/Search";
// import Detail from "./pages/Detail";
// import Booking from "./pages/Booking";
// import MyBookings from "./pages/MyBookings";
// import Home from "./pages/Home";

const App = () => {
  // const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>} />
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/detail/:hotelId" element={<Layout>{/* <Detail /> */}  </Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout>{/* <SignIn /> */}z</Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
