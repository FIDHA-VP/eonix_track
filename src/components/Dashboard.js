import { Card, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAttendanceStats } from "../api/dashboardApi";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const totalFee = 25000;

  const [stats, setStats] = useState({
    totalPercentage: 0,
    onlinePercentage: 0,
    offlinePercentage: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAttendanceStats();
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  const [payments, setPayments] = useState([
    {
      id: 1,
      name: "Ayesha Khan",
      paid: 15000,
    },
    {
      id: 2,
      name: "Ali Raza",
      paid: 12000,
    },
    {
      id: 3,
      name: "Zainab Fatima",
      paid: 10000,
    },
  ]);

  const handleDelete = (id) => {
    setPayments(
      payments.filter((student) => student.id !== id)
    );
  };

  const handleUpdate = (id) => {
    const amount = window.prompt(
      "Enter new paid amount:"
    );

    if (amount === null || amount === "") return;

    setPayments(
      payments.map((student) =>
        student.id === id
          ? {
              ...student,
              paid: Number(amount),
            }
          : student
      )
    );
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6">

      <Card className="mb-6">
        <h1 className="text-3xl font-bold">
          Good Morning,
          <span className="text-[#007979]">
            {" "}
            {user?.name || "User"}!
          </span>{" "}
          👋
        </h1>

        <p className="text-gray-600 mt-2">
          Here's what's happening with your progress today.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <Card className="bg-teal-100">
          <h5 className="text-lg font-semibold text-gray-600">
            Total Attendance
          </h5>

          <p className="text-5xl font-bold text-[#007979] mt-3">
            {stats.totalPercentage}%
          </p>
        </Card>

        <Card className="bg-green-100">
          <h5 className="text-lg font-semibold text-gray-600">
            Online Attendance
          </h5>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {stats.onlinePercentage}%
          </p>
        </Card>

        <Card className="bg-yellow-100">
          <h5 className="text-lg font-semibold text-gray-600">
            Offline Attendance
          </h5>

          <p className="text-5xl font-bold text-yellow-500 mt-3">
            {stats.offlinePercentage}%
          </p>
        </Card>

      </div>

      {user?.role === "Admin" && (
        <>
          <Card className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              Payment Details
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-3xl">
                ₹
              </div>

              <div>
                <p className="text-gray-500">
                  Total Fees Per Student
                </p>

                <h3 className="text-4xl font-bold text-[#007979]">
                  ₹{totalFee.toLocaleString()}
                </h3>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4">
              Student Fee Details
            </h2>

            <div className="space-y-4">
              {payments.map((student) => {
                const pending =
                  totalFee - student.paid;

                return (
                  <div
                    key={student.id}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">

                      <h3 className="text-lg font-bold">
                        {student.name}
                      </h3>

                      <div className="flex gap-2">

                        <Button
                          size="xs"
                          color="warning"
                          onClick={() =>
                            handleUpdate(student.id)
                          }
                        >
                          Update
                        </Button>

                        <Button
                          size="xs"
                          color="failure"
                          onClick={() =>
                            handleDelete(student.id)
                          }
                        >
                          Delete
                        </Button>

                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                      <div>
                        <p className="text-sm text-gray-500">
                          Total Fee
                        </p>

                        <p className="font-semibold">
                          ₹{totalFee.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Paid
                        </p>

                        <p className="font-semibold text-green-600">
                          ₹{student.paid.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Pending
                        </p>

                        <p className="font-semibold text-red-600">
                          ₹{pending.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Status
                        </p>

                        {pending <= 0 ? (
                          <p className="font-semibold text-green-600">
                            Fully Paid
                          </p>
                        ) : (
                          <p className="font-semibold text-yellow-500">
                            Pending
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}

    </div>
  );
}

export default Dashboard;