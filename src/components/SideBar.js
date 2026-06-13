import { Link } from "react-router-dom";

function SideBar() {
const user = JSON.parse(localStorage.getItem("user"));

return (
<>
<aside
id="default-sidebar"
className="fixed top-0 left-0 z-40 w-64 h-screen"
aria-label="Sidebar"
style={{ backgroundColor: "#007979" }}
> <div className="flex flex-col h-full px-4 py-5">


      {/* Logo */}
      <div className="text-center mb-8">
        <img
          src="/eonix-logo.png"
          alt="Eonix Solutions"
          className="w-44 mx-auto mb-2"
        />

        <h2 className="text-[#FDEB9E] text-3xl font-bold">
          EonixTrack
        </h2>

        <p className="text-white/80 text-sm">
          Student Progress Dashboard
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-3">

        {/* Dashboard - Admin Only */}
        {user?.role === "Admin" && (
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-[#FDEB9E] hover:text-black transition"
            >
              Dashboard
            </Link>
          </li>
        )}

        {/* Check In/Out - Admin & Student */}
        <li>
          <Link
            to="/checkinout"
            className="flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-[#FDEB9E] hover:text-black transition"
          >
            Check In / Out
          </Link>
        </li>

        {/* Daily Progress - Admin & Student */}
        <li>
          <Link
            to="/dailyprogress"
            className="flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-[#FDEB9E] hover:text-black transition"
          >
            Daily Progress
          </Link>
        </li>

        {/* History - Admin Only */}
        {user?.role === "Admin" && (
          <li>
            <Link
              to="/history"
              className="flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-[#FDEB9E] hover:text-black transition"
            >
              History
            </Link>
          </li>
        )}

        {/* My Profile - Admin & Student */}
        <li>
          <Link
            to="/myprofile"
            className="flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-[#FDEB9E] hover:text-black transition"
          >
            My Profile
          </Link>
        </li>

      </ul>

      <div className="border-t border-white/20 my-6"></div>

      <div className="flex-grow"></div>

      {/* Logout */}
      <ul className="space-y-3">
        <li>
          <Link
            to="/logout"
            className="flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-[#FDEB9E] hover:text-black transition"
          >
            ↪ Logout
          </Link>
        </li>
      </ul>

      <div className="border-t border-white/20 my-5"></div>

      {/* Profile Card */}
      <div className="border border-white/20 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h4 className="text-white font-semibold">
              {user?.name || "User"}
            </h4>

            <p className="text-white/70 text-sm">
              {user?.role || "Student"}
            </p>
          </div>
        </div>
      </div>

    </div>
  </aside>
</>

);
}

export default SideBar;