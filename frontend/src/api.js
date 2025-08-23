export const API = {
  async request(path, { method = 'GET', body, token } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(path.startsWith('/api') ? path : `/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });
    const raw = await res.text();
    let data = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (_) {
      data = { message: raw };
    }
    if (!res.ok) {
      const message = (data && data.message) ? data.message : (res.statusText || 'Request failed');
      const err = new Error(message);
      err.status = res.status;
      throw err;
    }
    return data;
  },

  // Auth
  register(payload) {
    return this.request('/auth/register', { method: 'POST', body: payload });
  },
  login(payload) {
    return this.request('/auth/login', { method: 'POST', body: payload });
  },
  me(token) {
    return this.request('/auth/me', { token });
  },

  // Courses
  listCourses(token) {
    return this.request('/courses', { token });
  },
  createCourse(payload, token) {
    return this.request('/courses', { method: 'POST', body: payload, token });
  },
  updateCourse(id, payload, token) {
    return this.request(`/courses/${id}`, { method: 'PUT', body: payload, token });
  },
  deleteCourse(id, token) {
    return this.request(`/courses/${id}`, { method: 'DELETE', token });
  },

  // Tasks
  listTasks(token) {
    return this.request('/tasks', { token });
  },
  listOverdueTasks(token) {
    return this.request('/tasks/overdue', { token });
  },
  createTask(payload, token) {
    return this.request('/tasks', { method: 'POST', body: payload, token });
  },
  updateTask(id, payload, token) {
    return this.request(`/tasks/${id}`, { method: 'PUT', body: payload, token });
  },
  deleteTask(id, token) {
    return this.request(`/tasks/${id}`, { method: 'DELETE', token });
  },
  toggleTask(id, token) {
    return this.request(`/tasks/${id}/toggle`, { method: 'PATCH', token });
  },
};


