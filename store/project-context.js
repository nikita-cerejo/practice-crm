import { createContext, useState, useEffect } from "react";
import { getAllProjects, getProjectById } from "../lib/api-util";

const ProjectContext = createContext({
  projects: [], // { id, name, description, logo, user_id }
  fetchProjects: () => {},
  fetchProjectById: (project_id = null) => {},
  filterProjects: (filter_val) => {},
  removeProject: (project_id) => {},
  isLoggedIn: false,
  setIsLoggedIn: (val) => {},
  loading: false,
  setLoading: (val) => {},
});

export function ProjectContextProvider(props) {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getProjects() {
      const project_list = await getAllProjects();
      //   console.log("project_list");

      setProjects(project_list);
    }
    getProjects();
  }, []);

  async function fetchProjectsHandler() {
    const project_list = await getAllProjects();
    setProjects(project_list);
  }

  async function fetchByIdHandler(project_id) {
    const project = await getProjectById(project_id);
    return project;
  }

  function filterByNameHandler(filter_val) {
    const project_list = getProjectsByName(filter_val);
    setProjects(project_list);
  }

  function removeProjectHandler(project_id) {
    setProjects(
      projects.filter((project) => {
        return project.id != project_id;
      })
    );
  }

  function setLoadingHandler(val) {
    setLoading(val);
  }

  function setIsLoggedInHandler(val) {
    setLoggedIn(val);
  }

  const context = {
    projects: projects,
    fetchProjects: fetchProjectsHandler,
    fetchProjectById: fetchByIdHandler,
    filterProjects: filterByNameHandler,
    removeProject: removeProjectHandler,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedInHandler,
    loading: loading,
    setLoading: setLoadingHandler,
  };

  return (
    <ProjectContext.Provider value={context}>
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
