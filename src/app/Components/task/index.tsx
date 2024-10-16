import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Edit2, Save } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prevTasks => [...prevTasks, { id: Date.now(), title: newTask, status: 'To Do' }]);
      setNewTask('');
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jira-like Todo List</h1>
      
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          className="flex-grow p-2 border rounded-l"
          placeholder="Enter a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['To Do', 'In Progress', 'Done'] as const).map(status => (
          <div key={status} className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{status}</h2>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
                  {editingTask && editingTask.id === task.id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className="flex-grow p-1 border rounded mr-2"
                      />
                      <button onClick={saveEdit} className="text-green-500 hover:text-green-600">
                        <Save size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{task.title}</span>
                      <div>
                        <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-600 mr-2">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-600">
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                    className="mt-2 p-1 border rounded text-sm w-full"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;