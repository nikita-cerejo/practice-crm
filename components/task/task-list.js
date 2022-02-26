import { Row } from "react-bootstrap";
import TaskItem from "./task-item";
import Head from "next/head";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

const TaskList = (props) => {
  const { tasks, updateTask, removeTask } = props;
  const router = useRouter();

  const createBtnHandler = () => {
    if (props.project_id) {
      router.push({
        pathname: "/tasks/create",
        query: {
          project_id: props.project_id,
        },
      });
      return;
    }
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

  if (!tasks) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>Loading...</h4>
        </div>
      </>
    );
  }

  if (0 == tasks.length) {
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
    if (props.project_id) {
      router.push(router.asPath);
      return;
    }
    removeTask(id);
  };

  const completeBtnHandler = (id) => {
    if (props.project_id) {
      router.push(router.asPath);
      return;
    }
    updateTask(id);
  };

  return (
    <>
      {headContent}
      <Row xs={1} md={3} className="g-3 mt-2 mx-0">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            project_id={task.project_id}
            is_done={task.is_done}
            due_date={task.due_date}
            project_name={task.project_name}
            deleteHandler={deleteBtnHandler}
            completeHandler={completeBtnHandler}
          />
        ))}
      </Row>
    </>
  );
};

export default TaskList;
