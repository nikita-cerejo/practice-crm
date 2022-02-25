import { Row } from "react-bootstrap";
import TaskItem from "./task-item";

const TaskList = (props) => {
  const { tasks } = props;

  return (
    <>
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
            deleteHandler={props.onDeleteHandler}
            completeHandler={props.onCompleteHandler}
          />
        ))}
      </Row>
    </>
  );
};

export default TaskList;
