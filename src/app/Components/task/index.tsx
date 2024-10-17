"use client";
import React, { useState, useEffect } from "react";
import {
  Save,
  Trash2,
  PlusCircleIcon,
  PenBoxIcon,
  FlagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task } from "../CreatingTask";

const LOCAL_STORAGE_KEY = "todo-tasks";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"All" | "To Do" | "Done">("All");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "To Do") return task.status === "To Do";
    if (filter === "Done") return task.status === "Done";
    return true;
  });
  const handleCreateTask = () => {
    window.open("/CreateTask", "_blank");
  };

  return (
    <div className="w-[1200px] mx-[20%] p-4 mt-8">
      <div className="flex items-center text-gray-900 justify-between mt-8 mb-6">
        <h2 className="text-4xl font-bold">My Tasks</h2>
        <Button
          onClick={handleCreateTask}
          className="bg-lime-500 hover:bg-lime-600 gap-2"
        >
          <PlusCircleIcon />
          Create new Task
        </Button>
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
      </div>

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
                    className="bg-white p-2 mb-2 rounded shadow cursor-pointer"
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
                          <option value="Low">Low </option>
                          <option value="Medium">Medium </option>
                          <option value="High">High</option>
                        </select>
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

                        <Button onClick={saveEdit} variant="outline" size="sm">
                          <Save size={18} className="mr-2" />
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between border-b-2 gap-2 mb-2">
                          <span className="flex items-center">
                            <FlagIcon />
                            {task.priority}
                          </span>
                          <span className="flex items-center">
                            {task.deadline}
                          </span>
                          <Button
                            onClick={() => removeTask(task.id)}
                            variant="secondary"
                            size="sm"
                            className="bg-red-500 mb-2"
                          >
                            <Trash2 size={18} />
                          </Button>
                          <Button
                            onClick={() => startEditing(task)}
                            variant="secondary"
                            size="sm"
                            className="mr-1 bg-lime-500"
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

export default TodoList;
