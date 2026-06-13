import { useState } from "react";
import {
  Card,
  Badge,
  Button,
  Modal,
  TextInput,
} from "flowbite-react";

function DailyProgress() {
  const user = JSON.parse(localStorage.getItem("user"));

  const status =
    localStorage.getItem("status") || "Active";

  const currentDate = new Date().toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const [newTask, setNewTask] = useState("");

  const [ongoingTasks, setOngoingTasks] = useState([
    "Design Dashboard UI",
    "Implement Sidebar Navigation",
    "Connect React Router Pages",
  ]);

  const [completedTasks, setCompletedTasks] =
    useState([
      "Installed Node.js",
      "Installed Flowbite React",
      "Created Dashboard Page",
    ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState("");
  const [taskIndex, setTaskIndex] = useState(null);

  // Add Task (Admin Only)
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    setOngoingTasks([
      ...ongoingTasks,
      newTask,
    ]);

    setNewTask("");
  };

  // Open Update Modal
  const handleUpdate = (task, index) => {
    setSelectedTask(task);
    setTaskIndex(index);
    setOpenModal(true);
  };

  // Save Updated Task
  const handleSave = () => {
    if (taskIndex === null) return;

    const updatedTasks = [...ongoingTasks];

    updatedTasks[taskIndex] =
      selectedTask;

    setOngoingTasks(updatedTasks);

    setOpenModal(false);
  };

  // Complete Task
  const handleComplete = (index) => {
    const completedTask =
      ongoingTasks[index];

    setCompletedTasks((prev) => [
      ...prev,
      completedTask,
    ]);

    setOngoingTasks(
      ongoingTasks.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-[#007979]">
          Daily Progress
        </h1>

        <p className="text-gray-600 mt-2">
          Track your daily work activities and
          completed tasks.
        </p>
      </Card>

      {/* TODAY DETAILS */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-3">
          Today's Details
        </h2>

        <p className="mb-2">
          <b>Date:</b> {currentDate}
        </p>

        <p className="mb-2">
          <b>Employee:</b>{" "}
          {user?.name || "Unknown User"}
        </p>

        <p className="flex items-center gap-2">
          <b>Status:</b>

          <Badge
            color={
              status === "Active"
                ? "success"
                : "failure"
            }
          >
            {status}
          </Badge>
        </p>
      </Card>

      {/* ADMIN ADD TASK */}
      {user?.role === "Admin" && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-[#007979]">
            Add New Task
          </h2>

          <div className="flex gap-3">
            <TextInput
              placeholder="Enter task"
              value={newTask}
              onChange={(e) =>
                setNewTask(e.target.value)
              }
            />

            <Button
              color="success"
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </div>
        </Card>
      )}

      {/* ONGOING TASKS */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#007979]">
          Ongoing Tasks
        </h2>

        {ongoingTasks.length === 0 ? (
          <p className="text-gray-500">
            No ongoing tasks.
          </p>
        ) : (
          <ul className="space-y-3">
            {ongoingTasks.map(
              (task, index) => (
                <li
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg flex justify-between items-center"
                >
                  <span>{task}</span>

                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      color="warning"
                      onClick={() =>
                        handleUpdate(
                          task,
                          index
                        )
                      }
                    >
                      Update
                    </Button>

                    <Button
                      size="xs"
                      color="success"
                      onClick={() =>
                        handleComplete(
                          index
                        )
                      }
                    >
                      Complete
                    </Button>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </Card>

      {/* COMPLETED TASKS */}
      <Card>
        <h2 className="text-xl font-bold mb-4 text-green-600">
          Completed Tasks
        </h2>

        {completedTasks.length === 0 ? (
          <p className="text-gray-500">
            No completed tasks.
          </p>
        ) : (
          <ul className="space-y-3">
            {completedTasks.map(
              (task, index) => (
                <li
                  key={index}
                  className="p-3 bg-green-50 rounded-lg"
                >
                  ✔ {task}
                </li>
              )
            )}
          </ul>
        )}
      </Card>

      {/* UPDATE MODAL */}
      <Modal
        show={openModal}
        size="md"
        popup={true}
        onClose={() =>
          setOpenModal(false)
        }
      >
        <div className="p-6">

          <h3 className="text-lg font-semibold mb-4">
            Update Task
          </h3>

          <TextInput
            value={selectedTask}
            onChange={(e) =>
              setSelectedTask(
                e.target.value
              )
            }
          />

          <div className="flex justify-end gap-2 mt-4">

            <Button
              color="gray"
              onClick={() =>
                setOpenModal(false)
              }
            >
              Cancel
            </Button>

            <Button
              color="blue"
              onClick={handleSave}
            >
              Save
            </Button>

          </div>

        </div>
      </Modal>

    </div>
  );
}

export default DailyProgress;