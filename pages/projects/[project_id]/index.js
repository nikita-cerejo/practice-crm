import { useRouter } from "next/router";
const ProjectDetailPage = () => {
  const router = useRouter();
  const project_id = router.query.project_id;
  return <h1>{project_id} Project Detail Page</h1>;
};

export default ProjectDetailPage;
