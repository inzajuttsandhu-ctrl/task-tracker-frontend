import React, { useState } from 'react';

const priorityColors = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-600',
  low: 'bg-green-100 text-green-600',
};

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (index, task) => {
    setEditIndex(index);
    setEditData({ ...task });
  };

  const saveEdit = () => {
    onEdit(editIndex, editData);
    setEditIndex(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-gray-400 font-medium">No tasks here!</p>
        <p className="text-gray-300 text-sm">Add a task to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task, index) => (
        <div key={index}
          className={`bg-white rounded-xl shadow p-4 border-l-4 transition-all ${
            task.status === 'completed' ? 'border-green-400 opacity-70' : 'border-yellow-400'}`}>

          {editIndex === index ? (
            <div className="flex flex-col gap-2">
              <input value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:border-green-400" />
              <input value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:border-green-400"
                placeholder="Description" />
              <div className="flex gap-2">
                <input type="date" value={editData.dueDate}
                  onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                  className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:border-green-400 flex-1" />
                <select value={editData.priority}
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:border-green-400 flex-1">
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
              <div className="flex gap-2 mt-1">
                <button onClick={saveEdit}
                  className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 flex-1">
                  ✅ Save
                </button>
                <button onClick={() => setEditIndex(null)}
                  className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 flex-1">
                  ✖ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <button onClick={() => onToggle(index)}
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {task.status === 'completed' && <span className="text-white text-xs">✓</span>}
                </button>
                <div>
                  <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </h3>
                  {task.description && <p className="text-sm text-gray-400 mt-0.5">{task.description}</p>}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">📅 {task.dueDate}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority || 'medium']}`}>
                      {task.priority || 'medium'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => startEdit(index, task)}
                  className="text-blue-400 hover:text-blue-600 transition-all text-lg">✏️</button>
                <button onClick={() => onDelete(index)}
                  className="text-gray-300 hover:text-red-500 transition-all text-lg">🗑️</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;