const BASE_URL = "http://127.0.0.1:8000";

// ── AUTH ──
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", email, password }),
  });
  return res.json();
};

export const signupUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

// ── TASKS ──
export const getTasks = async (email) => {
  const res = await fetch(`${BASE_URL}/tasks/${email}`);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const toggleTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
  });
  return res.json();
};