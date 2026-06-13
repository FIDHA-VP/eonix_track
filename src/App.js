import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import CheckInOut from "./components/CheckInOut";
import DailyProgress from "./components/DailyProgress";
import History from "./components/History";
import MyProfile from "./components/MyProfile";
import LogOut from "./components/LogOut";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <>
              <SideBar />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/checkinout"
          element={
            <>
              <SideBar />
              <CheckInOut />
            </>
          }
        />

        <Route
          path="/dailyprogress"
          element={
            <>
              <SideBar />
              <DailyProgress />
            </>
          }
        />

        <Route
          path="/history"
          element={
            <>
              <SideBar />
              <History />
            </>
          }
        />

        <Route
          path="/myprofile"
          element={
            <>
              <SideBar />
              <MyProfile />
            </>
          }
        />

        <Route
          path="/logout"
          element={
            <>
              <SideBar />
              <LogOut />
            </>
          }
        />

        <Route path="/" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;