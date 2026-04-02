import React, { useState, useEffect, useCallback } from 'react';
import Auth from './Auth';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Calendar from './Calendar';
import Toast from './Toast';
import { getTasks, createTask, deleteTask, toggleTask, updateTask } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (user) fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user]);
  const fetchTasks = async () => {
    setLoading(true);
    const data = await getTasks(user.email);
    setTasks(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleAddTask = async (task) => {
    try {
      await createTask({ ...task, user_email: user.email });
      await fetchTasks();
      showToast('Task added successfully! 🎉', 'success');
    } catch {
      showToast('Failed to add task!', 'error');
    }
  };

  const handleDelete = async (index) => {
    try {
      const task = filtered[index];
      await deleteTask(task._id);
      await fetchTasks();
      showToast('Task deleted!', 'warning');
    } catch {
      showToast('Failed to delete task!', 'error');
    }
  };

  const handleToggle = async (index) => {
    try {
      const task = filtered[index];
      await toggleTask(task._id);
      await fetchTasks();
      showToast('Task status updated! ✨', 'info');
    } catch {
      showToast('Failed to update task!', 'error');
    }
  };

  const handleEdit = async (index, updatedTask) => {
    try {
      const task = filtered[index];
      await updateTask(task._id, { ...updatedTask, user_email: user.email });
      await fetchTasks();
      showToast('Task updated successfully! ✏️', 'success');
    } catch {
      showToast('Failed to update task!', 'error');
    }
  };

  const filtered = activeTab === 'all' ? tasks
    : activeTab === 'pending' ? tasks.filter(t => t.status === 'pending')
    : tasks.filter(t => t.status === 'completed');

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!user) return <Auth onLogin={(u) => { setUser(u); showToast(`Welcome back, ${u.name}! 👋`, 'success'); }} />;

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'}}>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Header */}
      <div className="bg-green-600 shadow-lg px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2 shadow">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-wide">Task Tracker</h1>
            <p className="text-green-100 text-xs">Student Productivity Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-white text-sm font-semibold">👋 {user.name}</p>
            <p className="text-green-200 text-xs">{user.email}</p>
          </div>
          <button onClick={() => { setUser(null); setTasks([]); }}
            className="bg-white text-green-600 text-xs font-bold px-4 py-2 rounded-full hover:bg-green-50 transition-all shadow">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-4 shadow-lg mb-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-600">Overall Progress</span>
              <span className="text-sm font-bold text-green-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}></div>
            </div>
          </div>
          <div className="text-2xl">{progress === 100 ? '🏆' : progress > 50 ? '🔥' : '💪'}</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all">
            <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{total}</p>
            <p className="text-xs text-blue-400 mt-1">All tasks</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-all">
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-500 mt-1">{pending}</p>
            <p className="text-xs text-yellow-400 mt-1">Need attention</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all">
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-500 mt-1">{done}</p>
            <p className="text-xs text-green-400 mt-1">Well done! 🎉</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 flex flex-col gap-6">
            <TaskForm onAddTask={handleAddTask} />
            <Calendar tasks={tasks} />
          </div>
          <div className="col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {['all', 'pending', 'completed'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                      activeTab === tab ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-green-50'}`}>
                    {tab} {tab === 'all' ? `(${total})` : tab === 'pending' ? `(${pending})` : `(${done})`}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-xs">{new Date().toDateString()}</p>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl shadow p-10 text-center">
                <div className="animate-spin text-4xl mb-3">⚙️</div>
                <p className="text-gray-400 font-medium">Loading tasks...</p>
              </div>
            ) : (
              <TaskList tasks={filtered} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;