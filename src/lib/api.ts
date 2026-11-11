const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function register(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  return { response, data };
}


export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
}


export async function getAuthenticated(
  endpoint: string,
  token: string,
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return { response, data };
}


export async function createTask(
  title: string,
  token: string,
  description = ''
) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description: description.trim(),
    }),
  });

  const data = await response.json();
  return { response, data };
}


export async function updateTaskStatus(
  id: number,
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED',
  token: string
) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();
  return { response, data };
}


export async function updateTask(
  id: number,
  updates: { title: string; description?: string },
  token: string
) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await response.json();
  return { response, data };
}


export async function deleteTask(
  id: number,
  token: string
) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { response, data };
}