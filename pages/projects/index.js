import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { getAllProjects } from "../../lib/api-util";
import Head from "next/head";
import ProjectList from "../../components/project/project-list";
import { useState } from "react";
import Image from "next/image";
import ProjectContext from "../../store/project-context";
import { useContext } from "react";

const ProjectListPage = (props) => {
  const router = useRouter();
  const projectCtx = useContext(ProjectContext);

  const createBtnHandler = () => {
    router.push("/projects/create");
  };

  const headContent = (
    <>
      <Head>
        <title>All Projects</title>
      </Head>
      <div className="text-right mr-2 mt-2">
        <Button variant="primary" onClick={createBtnHandler}>
          Create Project
        </Button>
      </div>
    </>
  );

  if (!projectCtx.projects) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>Loading...</h4>
        </div>
      </>
    );
  }

  if (0 == projectCtx.projects.length) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>No Projects Available!</h4>
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
    projectCtx.removeProject(id);
  };

  const content = (
    <>
      {headContent}
      <ProjectList
        projects={projectCtx.projects}
        onDeleteHandler={deleteBtnHandler}
      />
    </>
  );
  return content;
};

// export async function getServerSideProps() {
//   const allProjects = await getAllProjects();
//   return {
//     props: {
//       projects: allProjects,
//     },
//   };
// }
export default ProjectListPage;
