import { useState, useEffect } from "react";
import {
  Card,
  Badge,
  Button,
  Modal,
  TextInput,
} from "flowbite-react";

import {
  getTasks,
  addTask,
  updateTask,
  completeTask,
} from "../api/taskApi";

function DailyProgress() {
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const loadTasks = async () => {
    try {
      const res = await getTasks();

      const ongoing = res.data.filter(
        (task) => task.status === "Ongoing"
      );

      const completed = res.data.filter(
        (task) => task.status === "Completed"
      );

      setOngoingTasks(ongoing);
      setCompletedTasks(completed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      await addTask(newTask);

      setNewTask("");

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (task) => {
    setSelectedTask(task.title);
    setSelectedId(task._id);
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      await updateTask(
        selectedId,
        selectedTask
      );

      setOpenModal(false);

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await completeTask(id);

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-6">

      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-[#007979]">
          Daily Progress
        </h1>

        <p className="text-gray-600 mt-2">
          Track daily work activities.
        </p>
      </Card>
<Card className="mb-6">
  <h2 className="text-xl font-bold mb-3">
    Today's Details
  </h2>

  <p>
    <b>Date:</b> {today}
  </p>

  <p>
    <b>Name:</b> {user?.name}
  </p>

  <p>
    <b>Role:</b> {user?.role}
  </p>

  <p className="flex items-center gap-2">
    <b>Status:</b>
    <Badge color="success">
      Active
    </Badge>
  </p>
</Card>

      {user?.role === "Admin" && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">
            Add New Task
          </h2>

          <div className="flex gap-3">
            <TextInput
              value={newTask}
              placeholder="Enter task"
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

     <Card className="mb-6">
  <h2 className="text-xl font-bold mb-4 text-[#007979]">
    Ongoing Tasks
  </h2>

  <ul className="space-y-3">
    {ongoingTasks.map((task) => (
      <li
        key={task._id}
        className="p-3 bg-blue-50 rounded-lg flex justify-between items-center"
      >
        <span>{task.title}</span>

        <div className="flex gap-2">

          {user?.role === "Admin" && (
            <Button
              size="xs"
              color="warning"
              onClick={() => handleUpdate(task)}
            >
              Update
            </Button>
          )}

          <Button
            size="xs"
            color="success"
            onClick={() => handleCompleteTask(task._id)}
          >
            Complete
          </Button>

        </div>
      </li>
    ))}
  </ul>
</Card>
      <Card>
        <h2 className="text-xl font-bold mb-4 text-green-600">
          Completed Tasks
        </h2>

        <ul className="space-y-3">
          {completedTasks.map((task) => (
            <li
              key={task._id}
              className="p-3 bg-green-50 rounded-lg"
            >
              ✅ {task.title}
            </li>
          ))}
        </ul>
      </Card>

      <Modal
        show={openModal}
        popup
        size="md"
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
              color="success"
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