import { useState } from "react";
import { Card, Button, Select } from "flowbite-react";
import { checkIn, checkOut } from "../api/attendanceApi";

export default function CheckInOut() {
  const userId = "6a269d2a4d0f3f56dde4bf12";

  const [mode, setMode] = useState("Online");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const [attendance, setAttendance] = useState({
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
  });

  const handleCheckIn = async () => {
    if (isCheckedIn) {
      alert("Already Checked In");
      return;
    }

    try {
      const res = await checkIn(userId, mode);

      console.log(res.data);

      const now = new Date();

      setAttendance({
        checkInDate: now.toLocaleDateString(),
        checkInTime: now.toLocaleTimeString(),
        checkOutDate: "",
        checkOutTime: "",
      });

      setIsCheckedIn(true);

      alert("Checked In Successfully");
    } catch (error) {
      console.log(error);
      alert("Check In Failed");
    }
  };

  const handleCheckOut = async () => {
    if (!isCheckedIn) {
      alert("Please Check In First");
      return;
    }

    if (isCheckedOut) {
      alert("Already Checked Out");
      return;
    }

    try {
      const res = await checkOut(userId);

      console.log(res.data);

      const now = new Date();

      setAttendance((prev) => ({
        ...prev,
        checkOutDate: now.toLocaleDateString(),
        checkOutTime: now.toLocaleTimeString(),
      }));

      setIsCheckedOut(true);

      alert("Checked Out Successfully");
    } catch (error) {
      console.log(error);
      alert("Check Out Failed");
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6">
      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-[#007979]">
          Check In / Check Out
        </h1>

        <p className="text-gray-600">
          Track your daily attendance.
        </p>
      </Card>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Mode
        </label>

        <Select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">
            Check In
          </h2>

          <Button
            color="success"
            onClick={handleCheckIn}
            disabled={isCheckedIn}
          >
            {isCheckedIn ? "Checked In" : "Check In"}
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">
            Check Out
          </h2>

          <Button
            color="failure"
            onClick={handleCheckOut}
            disabled={isCheckedOut}
          >
            {isCheckedOut ? "Checked Out" : "Check Out"}
          </Button>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-xl font-bold mb-4">
          Attendance Record
        </h2>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Mode</th>
              <th className="border p-2">Check In Date</th>
              <th className="border p-2">Check In Time</th>
              <th className="border p-2">Check Out Date</th>
              <th className="border p-2">Check Out Time</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-2">{mode}</td>
              <td className="border p-2">{attendance.checkInDate}</td>
              <td className="border p-2">{attendance.checkInTime}</td>
              <td className="border p-2">{attendance.checkOutDate}</td>
              <td className="border p-2">{attendance.checkOutTime}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}