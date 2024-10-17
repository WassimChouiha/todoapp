import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Save, Trash2 } from 'lucide-react';

// Import the JSON file
import tasksData from '../../../task.json';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const LOCAL_STORAGE_KEY = 'todo-tasks';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Try to load tasks from localStorage first
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    // If no saved tasks, use the tasks from the JSON file
    return tasksData.tasks.map(task => ({ ...task, description: '' }));
  });
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'All' | 'To Do' | 'Done'>('All');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.title.trim()) {
        setTasks(prevTasks => [...prevTasks, { id: Date.now(), ...newTask, status: 'To Do' }]);
      setNewTask({ title: '', description: '' });
    }
  };

  const removeTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const saveEdit = () => {
    if (editingTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === editingTask.id ? editingTask : task)
      );
      setEditingTask(null);
    }
  };

  const updateTaskStatus = (id: number, status: 'To Do' | 'In Progress' | 'Done') => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, status } : task)
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'To Do') return task.status === 'To Do';
    if (filter === 'Done') return task.status === 'Done';
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <div className="mb-4">
        {/* <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter a new task title"
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter task description"
          rows={3}
        /> */}
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full flex items-center justify-center"
        >
          <PlusCircle size={24} className="mr-2" />
          Add Task
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'All' | 'To Do' | 'Done')}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['To Do', 'In Progress', 'Done'] as const).map(status => (
          <div key={status} className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{status}</h2>
            {filteredTasks
              .filter(task => task.status === status)
              .map(task => (
                <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
                  {editingTask && editingTask.id === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="w-full p-1 border rounded mb-2"
                      />
                      <textarea
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        className="w-full p-1 border rounded mb-2"
                        rows={3}
                      />
                      <button onClick={saveEdit} className="text-green-500 hover:text-green-600">
                        <Save size={18} className="mr-2" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{task.title}</span>
                        <div>
                          <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-600 mr-2">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-600">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                        className="p-1 border rounded text-sm w-full"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;