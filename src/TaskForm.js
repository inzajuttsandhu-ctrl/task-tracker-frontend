import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    onAddTask({ title, description, dueDate, priority, status: 'pending' });
    setTitle(''); setDescription(''); setDueDate(''); setPriority('medium');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span className="bg-green-100 text-green-600 rounded-full p-1">➕</span>
        New Task
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Task Title *" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 p-3 rounded-lg text-sm focus:outline-none focus:border-green-400" />
        <textarea placeholder="Description (optional)" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-200 p-3 rounded-lg text-sm focus:outline-none focus:border-green-400 resize-none h-20" />
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Due Date</label>
          <input type="date" value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-200 p-3 rounded-lg text-sm w-full focus:outline-none focus:border-green-400" />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-200 p-3 rounded-lg text-sm w-full focus:outline-none focus:border-green-400">
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <button type="submit"
          className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all mt-1">
          + Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;