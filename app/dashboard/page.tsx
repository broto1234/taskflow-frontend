'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthenticated, createTask, updateTaskStatus, updateTask, deleteTask} from '@/src/lib/api';

type UpdateTaskPayload = { title: string; description: string; };

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};


export default function DashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  async function loadTasks(
  token: string,
  page = 1,
  searchTerm = search,
  selectedStatus = statusFilter,
  selectedSortBy = sortBy,
  selectedSortOrder = sortOrder
) {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '5',
        sortBy: selectedSortBy,
        order: selectedSortOrder,
      });

      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      }

      if (selectedStatus) {
        params.set('status', selectedStatus);
      }

      const { response, data } = await getAuthenticated(
        `/api/tasks?${params.toString()}`,
        token
      );

      if (response.ok) {
        setTasks(data.data.tasks);
        setPagination(data.data.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setChecking(false);
    }
  }

  async function handleStatusChange(
    taskId: number,
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  ) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const { response, data } = await updateTaskStatus(
        taskId,
        status,
        token
      );

      if (!response.ok) {
        setError(data.message ?? 'Failed to update task status');
        return;
      }

      setError('');
      await loadTasks(token);
    } catch (error) {
      console.error('Failed to update task status:', error);
      setError('Something went wrong while updating the task.');
    }
  }

  async function handleEditTask(
    taskId: number,
    payload: UpdateTaskPayload
  ) {
    const trimmedTitle = payload.title.trim();

    if (!trimmedTitle) {
      setError('Task title cannot be empty.');
      return;
    }

    const token = sessionStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const { response, data } = await updateTask(
        taskId,
        {
          title: trimmedTitle,
          description: payload.description.trim(),
        },
        token
      );

      if (!response.ok) {
        setError(data.message ?? 'Failed to update task.');
        return;
      }

      setError('');
      setEditingTaskId(null);
      setEditedTitle('');
      setEditedDescription('');
      await loadTasks(token);
    } catch (error) {
      console.error('Failed to edit task:', error);
      setError('Something went wrong while editing the task.');
    }
  }

  function startEditing(task: Task) {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description ?? '');
    setError('');
  }

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken === null) {
      router.replace('/login');
      return;
    }

    const token = storedToken;

    let ignore = false;

    async function fetchInitialTasks() {
      try {
        const { response, data } = await getAuthenticated(
          '/api/tasks?page=1&limit=5',
          token
        );

        if (!ignore && response.ok) {
          setTasks(data.data.tasks);
          setPagination(data.data.pagination);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        if (!ignore) {
          setChecking(false);
        }
      }
    }

    void fetchInitialTasks();

    return () => {
      ignore = true;
    };
  }, [router]);

  if (checking) {
    return <p className="p-6">Checking authentication...</p>;
  }

  async function handleCreateTask(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
      event.preventDefault();
      setError('');
      setIsCreating(true);

      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        return;
      }

      const token = sessionStorage.getItem('token');

      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        const { response, data } = await createTask(trimmedTitle, token, description);

        if (!response.ok) {
          setError(data.message ?? 'Failed to create task');
          return;
        }

        setTitle('');
        setDescription('');
        // We'll refresh the task list in the next step.
        await loadTasks(token);
      } catch (error) {
        console.error('Failed to create task:', error);
        setError('Something went wrong. Please try again.');
      } finally {
      setIsCreating(false);
    }
  }


  async function handleDeleteTask(taskId: number) {
  
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) return;

    const token = sessionStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      setError('');

      const { response, data } = await deleteTask(taskId, token);

      if (!response.ok) {
        setError(data.message ?? 'Failed to delete task.');
        return;
      }

      await loadTasks(token);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Something went wrong while deleting the task.');
    }
  }

  const filteredTasks = (tasks ?? []).filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description ?? '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === '' || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = pagination?.totalPages ?? 0;
  const paginatedTasks = filteredTasks;

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">TaskFlow Dashboard</h1>
        <p className="mt-2 mr-4 text-green-600">
          Logged in
        </p>
      </div>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <form onSubmit={handleCreateTask} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Enter a task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded border p-3 sm:flex-1"
        />

        <textarea
          placeholder="Enter a task description (optional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded border p-3 sm:flex-1"
          rows={2}
        />

        <button
          type="submit"
          disabled={isCreating}
          className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCreating ? 'Adding...' : 'Add task'}
        </button>
      </form>

      <div className="mb-6 mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);
            setCurrentPage(1);

            const token = sessionStorage.getItem('token');

            if (!token) {
              router.replace('/login');
              return;
            }

            void loadTasks(token, 1, value, statusFilter);
          }}
          className="w-full rounded border p-3 sm:flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            const value = e.target.value;

            setStatusFilter(value);
            setCurrentPage(1);

            const token = sessionStorage.getItem('token');

            if (!token) {
              router.replace('/login');
              return;
            }

            void loadTasks(token, 1, search, value);
          }}
          className="w-full rounded border p-3 sm:w-40"
        >
          <option value="">All statuses</option>
          <option value="TODO">To do</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => {
            const value = e.target.value;

            setSortBy(value);
            setCurrentPage(1);

            const token = sessionStorage.getItem('token');

            if (!token) {
              router.replace('/login');
              return;
            }

            void loadTasks(token, 1, search, statusFilter, value, sortOrder);
          }}
          className="w-full rounded border p-3 sm:w-40"
        >
          <option value="createdAt">Date created</option>
          <option value="updatedAt">Last updated</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            const value = e.target.value;

            setSortOrder(value);
            setCurrentPage(1);

            const token = sessionStorage.getItem('token');

            if (!token) {
              router.replace('/login');
              return;
            }

            void loadTasks(token, 1, search, statusFilter, sortBy, value);
          }}
          className="w-full rounded border p-3 sm:w-40"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="mt-6">
        {tasks === null ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Create your first task!</p>
        ) : (
          <ul className="space-y-3">
            {paginatedTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between rounded border p-4"
              >
                {editingTaskId === task.id ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleEditTask(task.id, {
                        title: editedTitle,
                        description: editedDescription,
                      });
                    }}
                    className="flex flex-1 flex-col gap-3"
                  >
                    <input
                      value={editedTitle}
                      onChange={(event) => setEditedTitle(event.target.value)}
                      placeholder="Task title"
                      className="rounded border p-2"
                      aria-label="Task title"
                    />

                    <textarea
                      value={editedDescription}
                      onChange={(event) => setEditedDescription(event.target.value)}
                      placeholder="Task description"
                      className="rounded border p-2"
                      aria-label="Task description"
                    />

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingTaskId(null)}
                        className="rounded border px-3 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="mt-1 text-sm text-gray-600">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={task.status}
                        onChange={(event) =>
                          handleStatusChange(
                            task.id,
                            event.target.value as 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
                          )
                        }
                        className="rounded border p-2 text-sm"
                        aria-label={`Status for ${task.title}`}
                      >
                        <option value="TODO">To do</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => startEditing(task)}
                        className="rounded border px-3 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {tasks !== null && filteredTasks.length > 0 && (
          <div className="max-w-1/2 mx-auto mt-8 flex flex-wrap items-center justify-between">
            <button
              type="button"
              onClick={() => {
                const token = sessionStorage.getItem('token');
                if (token) {
                  void loadTasks(token, currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
              className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <p className="text-sm text-gray-600">
              Page {currentPage} / {totalPages}
              {' '}({pagination?.total ?? 0} tasks)
            </p>

            <button
              type="button"
              onClick={() => {
                const token = sessionStorage.getItem('token');
                if (token) {
                  void loadTasks(token, currentPage + 1);
                }
              }}
              disabled={currentPage >= totalPages}
              className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}