import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/daily-progress"
      );

      setHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setLoading(false);
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6">
      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-[#007979]">
          History
        </h1>

        <p className="text-gray-600 mt-2">
          Attendance and activity records.
        </p>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[#E0F7F7]">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Daily Reports
          </h3>

          <p className="text-5xl font-bold text-[#007979] mt-3">
            {history.length}
          </p>
        </Card>

        <Card className="bg-[#D9FBE8]">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Tasks Completed
          </h3>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {
              history.filter(
                (item) => item.status === "Active"
              ).length
            }
          </p>
        </Card>
      </div>

      {/* Attendance History */}
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-[#007979] mb-4">
          Attendance History
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 p-3 rounded-lg"
              >
                {new Date(
                  item.createdAt
                ).toLocaleDateString()} -{" "}
                {item.status}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Activity History */}
      <Card>
        <h2 className="text-2xl font-bold text-[#007979] mb-4">
          Activity History
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item._id}>
                {item.ongoingTasks.map(
                  (task, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 p-3 rounded-lg mb-2"
                    >
                      {task}
                    </div>
                  )
                )}

                {item.completedTasks.map(
                  (task, index) => (
                    <div
                      key={index}
                      className="bg-green-50 p-3 rounded-lg mb-2"
                    >
                      ✔ {task}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default History;