"use client";
import React, { useState, useEffect } from "react";
import { Save, Trash2, PlusCircleIcon, PenBoxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task } from "../CreateTask";
import Link from "next/link";

const LOCAL_STORAGE_KEY = "todo-tasks";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"All" | "To Do" | "Done">("All");
  const [priorityFilter, setPriorityFilter] = useState<
    "All" | "Low" | "Medium" | "High"
  >("All");

  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    const savedTasks: Task[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    const newTasks = savedTasks.filter((task) => task.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const saveEdit = () => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? editingTask : task
        )
      );
      const savedTasks: Task[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );
      const newTasks = savedTasks.map((task) =>
        task.id === editingTask.id ? editingTask : task
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
      setEditingTask(null);
    }
  };

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, status: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
    const savedTasks: Task[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    const newTasks = savedTasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter !== "All" && task.status !== filter) return false;
    if (priorityFilter !== "All" && task.priority !== priorityFilter)
      return false;
    return true;
  });

  return (
    <div className="w-4/6 m-auto p-4 mt-8">
      <div className="flex items-center text-gray-900 justify-between mt-8 mb-6">
        <h2 className="text-4xl text-lime-500 font-bold">My Tasks</h2>
        <Link
          href="/dashboard/create-task"
          className="text-white p-2 gap-2 flex justify-center ml-2 rounded bg-lime-500 hover:bg-lime-600 "
        >
          <PlusCircleIcon />
          Create new Task
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "All" | "To Do" | "Done")
          }
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>
        <label className="mr-2 ml-4">Filter by Priority:</label>
        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value as "All" | "Low" | "Medium" | "High"
            )
          }
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["To Do", "In Progress", "Done"] as const).map((status) => (
          <Card
            key={status}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
            className="bg-gray-100 min-h-[200px]"
          >
            <CardHeader>
              <CardTitle>{status}</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    className="bg-white overflow-hidden p-2 mb-2 rounded shadow cursor-pointer"
                  >
                    {editingTask && editingTask.id === task.id ? (
                      <div>
                        <select
                          value={editingTask.priority}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option className="bg-gray-300" value="Low">
                            Low
                          </option>
                          <option className="bg-orange-300" value="Medium">
                            Medium
                          </option>
                          <option className="bg-red-300" value="High">
                            High
                          </option>
                        </select>
                        <textarea
                          value={editingTask.deadline}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              deadline: e.target.value,
                            })
                          }
                          className="w-full p-1 border rounded mb-2 resize-none"
                          rows={3}
                        />
                        <input
                          type="text"
                          value={editingTask.title}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              title: e.target.value,
                            })
                          }
                          className="w-full p-1 border rounded mb-2"
                        />
                        <textarea
                          value={editingTask.description}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-1 border rounded mb-2"
                          rows={3}
                        />

                        <Button onClick={saveEdit} variant="outline" size="sm" className="text-white bg-lime-500 hover:bg-lime-600">
                          <Save size={18} className="mr-2" />
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between border-b-2 gap-2 mb-2">
                          <span
                            className={`flex p-2 rounded-lg mb-2 ${
                              task.priority === "Low"
                                ? "bg-gray-300"
                                : task.priority === "Medium"
                                ? "bg-orange-300"
                                : "bg-red-300"
                            }`}
                          >
                            {task.priority}
                          </span>
                          <span className="flex items-center">
                            {task.deadline}
                          </span>
                          <Button
                            onClick={() => removeTask(task.id)}
                            variant="secondary"
                            size="sm"
                            className="text-white bg-red-500 mb-2 hover:bg-red-600"
                          >
                            <Trash2 size={18} />
                          </Button>
                          <Button
                            onClick={() => startEditing(task)}
                            variant="secondary"
                            size="sm"
                            className="mr-1 text-white bg-lime-500 hover:bg-lime-600"
                          >
                            <PenBoxIcon size={18} />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{task.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {task.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
