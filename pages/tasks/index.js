import TaskList from "../../components/task/task-list";
import TaskContext from "../../store/task-context";
// import { getAllTasks } from "../../lib/api-util";
import { useCallback, useContext, useEffect, useState } from "react";

const TaskListPage = (props) => {
  const taskCtx = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    const tasks = await taskCtx.fetchTasks();
    setTasks(tasks);
  }, [taskCtx]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (tasks.length == 0) {
    return (
      <div className="text-center text-muted">
        <h4>Loading...</h4>
      </div>
    );
  }

  const content = (
    <>
      <TaskList
        tasks={taskCtx.tasks}
        removeTask={taskCtx.removeTask}
        updateTask={taskCtx.updateTask}
      />
    </>
  );
  return content;
};

// export async function getServerSideProps() {
//   const allTasks = await getAllTasks();
//   return {
//     props: {
//       tasks: allTasks,
//     },
//   };
// }
export default TaskListPage;
