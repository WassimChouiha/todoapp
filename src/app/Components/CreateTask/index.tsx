import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority:"Low" | "Medium" | "High"
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
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "Low" as Task["priority"], });
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
      setNewTask({ title: "", description: "" , priority:"Low", });
    }
  };
  return (
    <div className="mb-4">
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter a new task title"
      />
      <textarea
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter task description"
        rows={3}
      />
       <select
        value={newTask.priority}
        onChange={(e) =>
          setNewTask({ ...newTask, priority: e.target.value as Task["priority"] })
        }
        className="w-full p-2 border rounded mb-2"
      >
        <option value="Low">Low </option>
        <option value="Medium">Medium </option>
        <option value="High">High</option>
      </select>
      <button
        onClick={addTask}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full flex items-center justify-center"
      >
        <PlusCircle size={24} className="mr-2" />
        Add Task
      </button>
    </div>
  );
};
export default CreateTask;
