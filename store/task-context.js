import { createContext, useState, useEffect } from "react";
import { getAllTasks, getTaskById, getTaskByProjectId } from "../lib/api-util";

const TaskContext = createContext({
  tasks: [], // { id, name, description, is_done due_date, project_id, user_id }
  fetchTasks: () => {},
  fetchTaskById: (task_id) => {},
  fetchTaskByProjectId: (project_id = null) => {},
  filterTasks: (filter_val) => {},
  removeTask: (task_id) => {},
  updateTask: (task_id) => {},
});

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    async function getTasks() {
      const task_list = await getAllTasks();
      //   console.log("task_list");
      setTasks(task_list);
    }
    getTasks();
  }, []);

  async function fetchTasksHandler() {
    const task_list = await getAllTasks();
    setTasks(task_list);
    return task_list;
  }

  async function fetchByProjectIdHandler(project_id) {
    const task_list = await getTaskByProjectId(project_id);
    setTasks(task_list);
    return task_list;
  }

  async function fetchByIdHandler(task_id) {
    const task = await getTaskById(task_id);
    return task;
  }

  function filterByNameHandler(filter_val) {
    const task_list = getTasksByName(filter_val);
    setTasks(task_list);
  }

  function removeTaskHandler(task_id) {
    setTasks(
      tasks.filter((task) => {
        return task.id != task_id;
      })
    );
  }

  function updateTaskHandler(task_id) {
    setTasks(
      tasks.map((task) => {
        if (task.id == task_id) {
          task.is_done = true;
        }
        return task;
      })
    );
  }

  const context = {
    tasks: tasks,
    fetchTasks: fetchTasksHandler,
    fetchTaskById: fetchByIdHandler,
    fetchTaskByProjectId: fetchByProjectIdHandler,
    filterTasks: filterByNameHandler,
    removeTask: removeTaskHandler,
    updateTask: updateTaskHandler,
  };

  return (
    <TaskContext.Provider value={context}>
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
