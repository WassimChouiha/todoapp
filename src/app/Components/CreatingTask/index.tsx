"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
}
const LOCAL_STORAGE_KEY = "todo-tasks";
const CreateTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: getCurrentDate(),
    priority: "Low" as Task["priority"],
  });
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: String(Date.now()),
          ...newTask,
          status: "To Do",
        },
      ]);
     
      setNewTask({ title: "", description: "",  deadline: getCurrentDate(), priority: "Low" });
    }
  };
  return (
    <>
      <h2 className="flex justify-center font-bold text-5xl text-gray-900 mt-8">
        Create new task
      </h2>
      <Card className="mt-8 bg-gray-100 w-[600px] h-[782px] ml-[35%]">
        <CardTitle className="flex justify-center my-2 font-bold text-xl">
          <h5>To do</h5>
        </CardTitle>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-[568px] h-14 my-2 mx-3 border p-2 rounded mb-2 gap-2"
          placeholder="Enter a new task title"
        />
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-[568px] h-[120px] mx-3 my-2 p-2 border rounded mb-2 resize-none"
          placeholder="Enter task description"
          rows={3}
        />
        <textarea
          value={newTask.deadline}
         
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          className="w-[568px] h-[67px] mx-3 my-2 p-2 border rounded mb-2 resize-none"
          placeholder="Enter Deadline"
          rows={3}
        />
        <select
          value={newTask.priority}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              priority: e.target.value as Task["priority"],
            })
          }
          className="w-[568px] h-12 mx-3 p-2 border rounded mb-2"
        >
          <option value="Low">Low </option>
          <option value="Medium">Medium </option>
          <option value="High">High</option>
        </select>
        <div className="flex my-[326px]">
          <button
            onClick={addTask}
            className="bg-lime-500 text-white p-2 rounded hover:bg-lime-600 w-[568px] flex mx-3 justify-center"
          >
            <PlusCircle size={24} className="mr-2" />
            Create new Task
          </button>
        </div>
      </Card>
    </>
  );
};
export default CreateTask;
