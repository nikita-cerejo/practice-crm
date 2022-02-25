import { useRouter } from "next/router";
const TaskDetailPage = () => {
  const router = useRouter();
  const task_id = router.query.task_id;
  return <h1>{task_id} Task Detail Page</h1>;
};

export default TaskDetailPage;
