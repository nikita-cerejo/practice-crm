import { Fragment } from "react";
import { Card } from "react-bootstrap";
import TaskForm from "../../../components/task/task-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import BackBtn from "../../../components/ui/back-btn";
import TaskContext from "../../../store/task-context";
import { useContext } from "react";
import { getTaskById } from "../../../lib/api-util";

const EditTaskPage = (props) => {
  const router = useRouter();
  const taskCtx = useContext(TaskContext);

  const formSubmitHandler = (data) => {
    if (props.task.is_done) {
      data.is_done = props.task.is_done;
    }
    fetch(`${process.env.API_URL}/tasks/${props.task.id}.json`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (200 <= resp.status || 400 > resp.status) {
          return resp.json();
        } else {
          toast.error("Something went wrong");
          throw "Something went wrong";
        }
      })
      .then((response) => {
        toast.success(`Task ${data.name} created successfully!`);
        taskCtx.fetchTasks();
        router.push("/tasks");
      });
  };
  return (
    <Fragment>
      <Card className="m-0">
        <Card.Title>
          <BackBtn />
          <h4 className="m-4 text-center">Edit Task</h4>
        </Card.Title>
        <Card.Body>
          <TaskForm
            formSubmitHandler={formSubmitHandler}
            btnName="Update"
            task={props.task}
          ></TaskForm>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { task_id } = context.query;
  const task = await getTaskById(task_id);

  return {
    props: {
      task: task,
    },
  };
}
export default EditTaskPage;
