import Login from "../components/auth/login";
import { getAllProjects, getAllTasks } from "../lib/api-util";
import styles from "../styles/Home.module.css";
import ProjectContext from "../store/project-context";
import TaskContext from "../store/task-context";
import { useContext } from "react";
import { useSession } from "next-auth/react";

export default function Home(props) {
  const projectCtx = useContext(ProjectContext);
  const taskCtx = useContext(TaskContext);
  const { data: session, status } = useSession();

  return (
    <div>
      <main>
        {!projectCtx.isLoggedIn && <Login />}
        {projectCtx.isLoggedIn && status === "authenticated" && (
          <div className={styles.grid}>
            <div
              className={`card bg-info text-white row mx-0 w-25 p-3 text-center my-4 ${styles["card-shadow"]}`}
            >
              <div>
                <h5>Projects Count</h5>
              </div>
              <div>
                <h5>
                  <b>{projectCtx.projects ? projectCtx.projects.length : 0}</b>
                </h5>
              </div>
            </div>
            <div
              className={`card bg-success text-white row mx-0 w-25 p-3 text-center my-4 ${styles["card-shadow"]}`}
            >
              <div>
                <h5>Tasks Count</h5>
              </div>
              <div>
                <h5>
                  <b>{taskCtx.tasks ? taskCtx.tasks.length : 0}</b>
                </h5>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const allProjects = await getAllProjects();
//   const allTasks = await getAllTasks();

//   return {
//     props: {
//       projects_count: allProjects.length,
//       tasks_count: allTasks.length,
//     },
//   };
// }
