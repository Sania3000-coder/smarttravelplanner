import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import Planner from "./pages/Planner";
import Budget from "./pages/Budget";
import Weather from "./pages/Weather";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
function App() {
    return (
        <BrowserRouter>
            
            <Navbar />

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/explore" element={<Explore/>} />
                <Route path="/destination/:name" element={<DestinationDetails />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/blogs" element={< Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;