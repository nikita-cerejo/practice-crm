import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { getAllTasks } from "../../lib/api-util";
import Head from "next/head";
import TaskList from "../../components/task/task-list";
import Image from "next/image";
import ProjectContext from "../../store/project-context";
import TaskContext from "../../store/task-context";
import { useContext } from "react";

const TaskListPage = (props) => {
  const router = useRouter();
  const taskCtx = useContext(TaskContext);

  const createBtnHandler = () => {
    router.push("/tasks/create");
  };

  const headContent = (
    <>
      <Head>
        <title>All Tasks</title>
      </Head>
      <div className="text-right mr-2 mt-2">
        <Button variant="primary" onClick={createBtnHandler}>
          Create Task
        </Button>
      </div>
    </>
  );

  if (!taskCtx.tasks) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>Loading...</h4>
        </div>
      </>
    );
  }

  if (0 == taskCtx.tasks.length) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>No Tasks Available!</h4>
          <Image
            src="/images/no-data.jpg"
            width="350"
            height="350"
            alt="No Data"
          />
        </div>
      </>
    );
  }

  const deleteBtnHandler = (id) => {
    taskCtx.removeTask(id);
  };

  const completeBtnHandler = (id) => {
    taskCtx.updateTask(id);
  };

  const content = (
    <>
      {headContent}
      <TaskList
        tasks={taskCtx.tasks}
        onDeleteHandler={deleteBtnHandler}
        onCompleteHandler={completeBtnHandler}
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
