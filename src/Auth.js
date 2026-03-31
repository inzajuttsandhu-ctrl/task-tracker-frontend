import React, { useState } from 'react';
import { loginUser, signupUser } from './api';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill all fields!'); return; }
    if (!isLogin && !form.name) { setError('Name is required!'); return; }
    setLoading(true);
    setError('');
    try {
      let res;
      if (isLogin) {
        res = await loginUser(form.email, form.password);
        if (res.detail) { setError(res.detail); return; }
        onLogin({ name: res.name, email: res.email });
      } else {
        res = await signupUser(form.name, form.email, form.password);
        if (res.detail) { setError(res.detail); return; }
        setError('');
        setIsLogin(true);
        alert('Account created! Please login.');
      }
    } catch {
      setError('Server error! Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'}}>
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-white text-3xl font-bold">Task Tracker</h1>
          <p className="text-green-300 text-sm mt-1">Student Productivity Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                isLogin ? 'bg-green-600 text-white shadow' : 'text-gray-500'}`}>
              Login
            </button>
            <button onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                !isLogin ? 'bg-green-600 text-white shadow' : 'text-gray-500'}`}>
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">Full Name</label>
                <input name="name" type="text" placeholder="John Doe"
                  value={form.name} onChange={handleChange}
                  className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-green-400" />
              </div>
            )}
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Email Address</label>
              <input name="email" type="email" placeholder="student@university.edu"
                value={form.email} onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-green-400" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Password</label>
              <input name="password" type="password" placeholder="••••••••"
                value={form.password} onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-green-400" />
            </div>

            {error && <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded-lg">{error}</p>}

            <button type="submit" disabled={loading}
              className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md mt-1 disabled:opacity-50">
              {loading ? '⏳ Please wait...' : isLogin ? '🔐 Login' : '🚀 Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-green-600 font-semibold cursor-pointer hover:underline">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
        <p className="text-center text-gray-500 text-xs mt-4">© 2026 Task Tracker • Student Edition</p>
      </div>
    </div>
  );
}

export default Auth;