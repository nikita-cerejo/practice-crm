import { Fragment } from "react";
import { Card } from "react-bootstrap";
import TaskForm from "../../components/task/task-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import BackBtn from "../../components/ui/back-btn";
import TaskContext from "../../store/task-context";
import { useContext } from "react";

const CreateTaskPage = (props) => {
  const router = useRouter();
  const taskCtx = useContext(TaskContext);

  const formSubmitHandler = (data) => {
    fetch(`${process.env.API_URL}/tasks.json`, {
      method: "POST",
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
          <h4 className="m-4 text-center">Create Task</h4>
        </Card.Title>
        <Card.Body>
          <TaskForm formSubmitHandler={formSubmitHandler}></TaskForm>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default CreateTaskPage;
