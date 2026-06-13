import { Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  };

  const handleCancel = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/checkinout");
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Logout
        </h1>

        <p className="text-gray-600 mb-6">
          Logout from existing account?
        </p>

        <div className="flex justify-center gap-4">

          <Button
            color="failure"
            onClick={handleLogout}
          >
            Logout
          </Button>

          <Button
            color="gray"
            onClick={handleCancel}
          >
            Cancel
          </Button>

        </div>

      </Card>
    </div>
  );
}

export default Logout;