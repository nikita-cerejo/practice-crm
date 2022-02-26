import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import TaskList from "../../../../components/task/task-list";
import { getTaskByProjectId } from "../../../../lib/api-util";
import TaskContext from "../../../../store/task-context";

const ProjectTaskPage = (props) => {
  const router = useRouter();
  const project_id = router.query.project_id;
  const taskCtx = useContext(TaskContext);
  const tasks = props.tasks;

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
        project_id={project_id}
        tasks={tasks}
        removeTask={taskCtx.removeTask}
        updateTask={taskCtx.updateTask}
      />
    </>
  );
  return content;
};

export async function getServerSideProps(context) {
  const { project_id } = context.query;
  const task_list = await getTaskByProjectId(project_id);
  return {
    props: {
      tasks: task_list,
    },
  };
}
export default ProjectTaskPage;
