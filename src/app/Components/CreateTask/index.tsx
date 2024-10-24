"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { getCurrentDate } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "To Do" | "In Progress" | "Done";
  priority: string;
}

const LOCAL_STORAGE_KEY = "todo-tasks";

const CreateTask: React.FC = () => {
  const [, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: getCurrentDate(),
    priority: "Low" as Task["priority"],
  });

  const router = useRouter();

  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: String(Date.now()),
        ...newTask,
        status: "To Do",
      };

      setTasks((prevTasks) => [...prevTasks, task]);

      const savedTasks: Task[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );
      savedTasks.push(task);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedTasks));

      setNewTask({
        title: "",
        description: "",
        deadline: getCurrentDate(),
        priority: "Low",
      });

      router.push("/dashboard/my-task");
    }
  };

  return (
    <>
      <h2 className="flex justify-center font-bold text-5xl text-gray-900 mt-8">
        Create new task
      </h2>
      <Card className="mt-8 bg-gray-100 w-4/12 max-h-screen mx-auto">
        <CardTitle className="flex justify-center my-2 font-bold text-xl">
          <p className="font-bold text-xl">To do</p>
        </CardTitle>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-11/12 h-10 my-2 ml-4 border p-2 rounded mb-2 gap-2"
          placeholder="Enter a new task title"
        />
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-11/12 h-32 ml-4 my-2 p-2 border rounded mb-2 resize-none"
          placeholder="Enter task description"
          rows={3}
        />
        <textarea
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          className="w-11/12 h-16 ml-4 my-2 p-2 border rounded mb-2 resize-none"
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
          className="w-11/12 h-12 ml-4 p-2 border rounded mb-2"
        >
          <option value="Low">Low </option>
          <option value="Medium">Medium </option>
          <option value="High">High</option>
        </select>
        <div className="flex mt-60 mb-2">
          <Link
            className="bg-red-500 text-white p-2 flex w-full justify-center ml-4 rounded hover:bg-red-600"
            href="/dashboard/my-task"
          >
            Cancel
          </Link>
          <button
            onClick={addTask}
            className="bg-lime-500 text-white mr-4 p-2 rounded hover:bg-lime-600 w-full flex mx-3 justify-center"
          >
            Save
          </button>
        </div>
      </Card>
    </>
  );
};
export default CreateTask;
